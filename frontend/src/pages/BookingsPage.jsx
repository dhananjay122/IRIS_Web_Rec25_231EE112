import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired! Please login again.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/bookings/booked", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white vh-100 vw-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">My Bookings</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <Table title="My Bookings" data={bookings} />
          </div>
        )}
      </div>
    </div>
  );
};

const Table = ({ title, data }) => (
  <div className="w-full flex flex-col items-center">
    <h2 className="text-2xl font-semibold mb-4 text-gray-300 text-center w-full">{title}</h2>
    <div className="w-3/4 flex justify-center">
      <table className="table table-dark table-striped table-bordered text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Type</th>
            <th>{"Date & Time / Quantity"}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.itemName}</td>
                <td>{booking.itemType.charAt(0).toUpperCase() + booking.itemType.slice(1)}</td>
                <td>
                  {booking.itemType === "infrastructure"
                    ? `${booking.date} | ${booking.timeSlot}`
                    : `Quantity: ${booking.quantity}`}
                </td>
                <td
                  className={
                    booking.status.toLowerCase() === "approved"
                      ? "text-success fw-bold"
                      : booking.status.toLowerCase() === "pending"
                      ? "text-warning fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted">
                No bookings found. Try requesting equipment or infrastructure.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default BookingsPage;


