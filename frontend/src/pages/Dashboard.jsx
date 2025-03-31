import { useEffect, useState } from "react";
 import Navbar from "./Navbar";
 
 const Dashboard = () => {
   const [equipments, setEquipments] = useState([]);
   const [infrastructures, setInfrastructures] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedItem, setSelectedItem] = useState(null);
   const [selectedType, setSelectedType] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [formData, setFormData] = useState({ rollNumber: "", quantity: 1, duration: "" });
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch("http://localhost:5000/api/dashboard");
         const data = await response.json();
         setEquipments(data.equipments || []);
         setInfrastructures(data.infrastructures || []);
       } catch (error) {
         console.error("Error fetching data:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchData();
   }, []);
 
   const openRequestModal = (item, type) => {
     setSelectedItem(item);
     setSelectedType(type);
     setShowModal(true);
     setFormData({ rollNumber: "", quantity: 1, duration: "" });
   };
 
   const handleInputChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   const handleSubmitRequest = async () => {
     if (!formData.rollNumber.trim()) {
       alert("Roll Number is required!");
       return;
     }
   
     if (!formData.duration.trim()) {
       alert("Duration is required!");
       return;
     }
   
     if (!formData.quantity || formData.quantity < 1) {
       alert("Please enter a valid quantity!");
       return;
     }
   
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         alert("User not authenticated!");
         return;
       }
   
       const url =
         selectedType === "equipment"
           ? "http://localhost:5000/api/equipment-requests/request"
           : "http://localhost:5000/api/infrastructure-requests/request";
   
       const requestBody =
         selectedType === "equipment"
           ? {
               rollNumber: formData.rollNumber.trim(),
               equipmentName: selectedItem.name, // Corrected key for equipment
               quantity: parseInt(formData.quantity, 10),
               duration: formData.duration.trim(),
             }
           : {
               rollNumber: formData.rollNumber.trim(),
               infrastructureName: selectedItem.name, // Corrected key for infrastructure
               quantity: parseInt(formData.quantity, 10),
               duration: formData.duration.trim(),
             };
   
       console.log("Sending request:", requestBody);
   
       const response = await fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(requestBody),
       });
   
       const data = await response.json();
       console.log("Response:", data);
   
       if (response.ok) {
         alert("Request sent successfully!");
         setShowModal(false); // Close modal
       } else {
         alert(`Failed: ${data.error || "Unknown error"}`);
       }
     } catch (error) {
       console.error("Error sending request:", error);
       alert("Error while sending request.");
     }
   };
   
 
   return (
     <div className="min-h-screen bg-black text-white vh-100 vw-100">
       <Navbar />
       <div className="p-8">
         <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">
           Sports and Infrastructure Dashboard
         </h1>
 
         {loading ? (
           <p className="text-center text-gray-400">Loading...</p>
         ) : (
           <div className="w-full flex flex-col items-center gap-8">
             <Table title="Available Equipment" data={equipments} type="equipment" onRequest={openRequestModal} />
             <Table title="Available Infrastructure" data={infrastructures} type="infrastructure" onRequest={openRequestModal} />
           </div>
         )}
 
         {showModal && (
           <Modal selectedItem={selectedItem} formData={formData} handleInputChange={handleInputChange} handleSubmitRequest={handleSubmitRequest} setShowModal={setShowModal} />
         )}
       </div>
     </div>
   );
 };
 
 const Table = ({ title, data, type, onRequest }) => (
   <div className="w-full flex flex-col items-center">
     <h2 className="text-2xl font-semibold mb-4 text-gray-300 text-center w-full">{title}</h2>
     <div className="w-3/4 flex justify-center">
       <table className="table table-dark table-striped table-bordered text-center">
         <thead>
           <tr>
             <th>#</th>
             <th>Name</th>
             <th>Details</th>
             <th>Availability</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           {data.length > 0 ? (
             data.map((item, index) => (
               <tr key={item._id}>
                 <td>{index + 1}</td>
                 <td>{item.name}</td>
                 <td>
                   {type === "equipment"
                     ? `Category: ${item.category}`
                     : `Location: ${item.location}, Capacity: ${item.capacity}`}
                 </td>
                 <td className={item.status.toLowerCase() === "available" ? "text-success fw-bold" : "text-danger fw-bold"}>
                   {item.status}
                 </td>
                 <td>
                   {item.status.toLowerCase() === "available" ? (
                     <button onClick={() => onRequest(item, type)} className="btn btn-primary">
                       Request
                     </button>
                   ) : (
                     <span className="text-muted">Unavailable</span>
                   )}
                 </td>
               </tr>
             ))
           ) : (
             <tr>
               <td colSpan="5" className="text-muted">No {type} available.</td>
             </tr>
           )}
         </tbody>
       </table>
     </div>
   </div>
 );
 
 const Modal = ({ selectedItem, formData, handleInputChange, handleSubmitRequest, setShowModal }) => (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
       <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">Request {selectedItem.name}</h2>
       <label className="block text-gray-300 mb-2">Roll Number:</label>
       <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} className="w-full p-2 mb-3 bg-gray-700 text-white border rounded" placeholder="Enter roll number" />
       <label className="block text-gray-300 mb-2">Quantity:</label>
       <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-2 mb-3 bg-gray-700 text-white border rounded" min="1" />
       <label className="block text-gray-300 mb-2">Duration:</label>
       <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full p-2 mb-3 bg-gray-700 text-white border rounded" placeholder="Enter duration" />
       <div className="flex justify-between mt-4">
         <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded">Cancel</button>
         <button onClick={handleSubmitRequest} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
       </div>
     </div>
   </div>
 );
 
 export default Dashboard;






