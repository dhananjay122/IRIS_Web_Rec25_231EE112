import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [equipmentRequests, setEquipmentRequests] = useState([]);
    const [infrastructureRequests, setInfrastructureRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "admin") {
            alert("Access denied!");
            navigate("/dashboard");
        }
    }, [navigate]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        try {
            const headers = { Authorization: `Bearer ${token}` };
            const [equipmentRes, infrastructureRes] = await Promise.all([
                fetch("http://localhost:5000/api/equipment-requests/", { headers }),
                fetch("http://localhost:5000/api/infrastructure-requests/", { headers })
            ]);

            setEquipmentRequests(await equipmentRes.json());
            setInfrastructureRequests(await infrastructureRes.json());
        } catch (err) {
            console.error("Error fetching requests:", err);
            setError("Failed to fetch requests. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async (requestId, type, status) => {
        const token = localStorage.getItem("token");
        const endpoint = type === "equipment"
            ? `http://localhost:5000/api/equipment-requests/${requestId}`
            : `http://localhost:5000/api/infrastructure-requests/${requestId}`;

        const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });

        if (res.ok) {
            alert(`Request ${status}`);
            fetchRequests();
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <h2 className="my-3 text-center">Admin Dashboard - Approve/Reject Requests</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
            ) : (
                <>
                    {/* Equipment Requests Table */}
                    <h3 className="text-center mt-4">Equipment Requests</h3>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Equipment Name</th>
                                    <th>Roll Number</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipmentRequests.length === 0 ? (
                                    <tr><td colSpan="5">No equipment requests found.</td></tr>
                                ) : (
                                    equipmentRequests.map((req, index) => (
                                        <tr key={req._id}>
                                            <td>{index + 1}</td>
                                            <td>{req.EquipmentName}</td>
                                            <td>{req.rollNumber}</td>
                                            <td>{req.quantity}</td>
                                            <td>
                                                {req.status === "pending" ? (
                                                    <>
                                                        <button className="btn btn-success btn-sm mx-1" onClick={() => handleRequest(req._id, "equipment", "approved")}>
                                                            Approve
                                                        </button>
                                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRequest(req._id, "equipment", "rejected")}>
                                                            Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-muted">{req.status}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Infrastructure Requests Table */}
                    <h3 className="text-center mt-4">Infrastructure Requests</h3>
                    <div className="table-responsive">
                        <table className="table table-dark table-striped table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Infrastructure Name</th>
                                    <th>Roll Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {infrastructureRequests.length === 0 ? (
                                    <tr><td colSpan="4">No infrastructure requests found.</td></tr>
                                ) : (
                                    infrastructureRequests.map((req, index) => (
                                        <tr key={req._id}>
                                            <td>{index + 1}</td>
                                            <td>{req.itemName}</td>
                                            <td>{req.rollNumber}</td>
                                            <td>
                                                {req.status === "pending" ? (
                                                    <>
                                                        <button className="btn btn-success btn-sm mx-1" onClick={() => handleRequest(req._id, "infrastructure", "approved")}>
                                                            Approve
                                                        </button>
                                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRequest(req._id, "infrastructure", "rejected")}>
                                                            Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-muted">{req.status}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;


