import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        rollNumber,
        branch,
        password,
        role,
      });
      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-dark">
      <div className="card p-4 shadow-lg text-light" style={{ width: "400px", backgroundColor: "#161b22" }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control bg-dark text-light border-secondary" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control bg-dark text-light border-secondary" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Roll Number</label>
            <input 
              type="text" 
              className="form-control bg-dark text-light border-secondary" 
              required 
              value={rollNumber} 
              onChange={(e) => setRollNumber(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Branch</label>
            <input 
              type="text" 
              className="form-control bg-dark text-light border-secondary" 
              required 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control bg-dark text-light border-secondary" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select 
              className="form-select bg-dark text-light border-secondary" 
              required 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? 
          <span className="text-primary text-decoration-none cursor-pointer" onClick={() => navigate("/")}> Login</span>
        </p>
      </div>
    </div>
  );
  
};

export default Register;



