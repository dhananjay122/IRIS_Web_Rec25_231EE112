import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear authentication (if applicable)
    localStorage.removeItem("authToken"); // Example if you're storing a token

    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="container text-center mt-4"> {/* Added margin-top for spacing */}
      <div className="row justify-content-center"> {/* Center align items */}
        <div className="col-md-3 col-sm-6 mb-2">
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Logout
          </button>
        </div>
        <div className="col-md-3 col-sm-6 mb-2">
          <Link to="/booking" className="btn btn-primary w-100">Booking</Link>
        </div>
        <div className="col-md-3 col-sm-6 mb-2">
          <Link to="/requests" className="btn btn-primary w-100">Requests</Link>
        </div>
        <div className="col-md-3 col-sm-6 mb-2"> {/* New button for Dashboard */}
          <Link to="/dashboard" className="btn btn-success w-100">Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;





