import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Requests = () => {
  const [equipmentRequests, setEquipmentRequests] = useState([]);
  const [infrastructureRequests, setInfrastructureRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const [equipmentRes, infrastructureRes] = await Promise.all([
          fetch("http://localhost:5000/api/equipment-requests", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/api/infrastructure-requests", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!equipmentRes.ok || !infrastructureRes.ok) {
          throw new Error("Failed to fetch requests");
        }

        const equipmentData = await equipmentRes.json();
        const infrastructureData = await infrastructureRes.json();
        setEquipmentRequests(equipmentData);
        setInfrastructureRequests(infrastructureData);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white vh-100 vw-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">
          My Requests
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <Table title="My Equipment Requests" data={equipmentRequests} columns={["Equipment Name", "Quantity", "Duration", "Status", "Request Date"]} />
            <Table title="My Infrastructure Requests" data={infrastructureRequests} columns={["Infrastructure Name", "Duration", "Status", "Request Date"]} />
          </div>
        )}
      </div>
    </div>
  );
};

const Table = ({ title, data, columns }) => (
  <div className="w-full flex flex-col items-center">
    <h2 className="text-2xl font-semibold mb-4 text-gray-300 text-center w-full">{title}</h2>

    <div className="w-3/4 flex justify-center">
      <table className="table table-dark table-striped table-bordered text-center">
        <thead>
          <tr>
            <th>SI No</th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((req, index) => (
              <tr key={req._id || index}>
                            <td>{index + 1}</td>
                            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col === "Status" ? (
                  <span
                    className={
                      req.status
                        ? req.status.toLowerCase() === "approved"
                          ? "text-success fw-bold"
                          : req.status.toLowerCase() === "pending"
                          ? "text-warning fw-bold"
                          : "text-danger fw-bold"
                        : "text-muted"
                    }
                  >
                    {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "N/A"}
                  </span>
                ) : col === "Request Date" ? (
                  req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "N/A"
                ) : col === "Equipment Name" ? (
                  req.equipmentName || "N/A"
                ) : col === "Infrastructure Name" ? (
                  req.infrastructureName || "N/A"
                ) : (
                  req[col.toLowerCase().replace(/ /g, "")] || "N/A"
                )}
              </td>
            ))}
            
                          </tr>
                        ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-muted">No requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Requests;






