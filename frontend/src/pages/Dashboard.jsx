import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.role !== "admin") {
            alert("Access denied!");
            navigate("/dashboard"); // Redirect students
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

            // Fetch both equipment and infrastructure requests
            const [equipmentRes, infrastructureRes] = await Promise.all([
                fetch("http://localhost:5000/api/equipment-requests/", { headers }),
                fetch("http://localhost:5000/api/infrastructure-requests/", { headers })
            ]);

            const equipmentData = await equipmentRes.json();
            const infrastructureData = await infrastructureRes.json();

            // Merge both responses
            const mergedRequests = [
                ...equipmentData.map(req => ({ ...req, type: "equipment" })),
                ...infrastructureData.map(req => ({ ...req, type: "infrastructure" }))
            ];

            setRequests(mergedRequests);
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

            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : requests.length === 0 ? (
                    <p className="text-center">No requests found.</p>
                ) : (
                    <div className="table-responsive flex-grow-1">
                        <table className="table table-dark table-striped table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Student</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, index) => (
                                    <tr key={req._id}>
                                        <td>{index + 1}</td>
                                        <td>{req.type.charAt(0).toUpperCase() + req.type.slice(1)}</td>
                                        <td>{req.rollNumber}</td>
                                        <td>{req.itemName || "N/A"}</td>
                                        <td>{req.quantity || "N/A"}</td>
                                        <td>{req.duration || "N/A"}</td>
                                        <td className={req.status === "pending" ? "text-warning" : req.status === "approved" ? "text-success" : "text-danger"}>
                                            {req.status}
                                        </td>
                                        <td>
                                            {req.status === "pending" ? (
                                                <>
                                                    <button className="btn btn-success btn-sm mx-1" onClick={() => handleRequest(req._id, req.type, "approved")}>
                                                        Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleRequest(req._id, req.type, "rejected")}>
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-muted">No Actions</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;






