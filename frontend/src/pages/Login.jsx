import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    };
   
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100" style={{ backgroundColor: "#0d1117" }}>
        <div className="card p-4 shadow-lg text-light" style={{ width: "360px", backgroundColor: "#161b22" }}>
          <h2 className="text-center mb-4">Sign in to Sports_Infra</h2>
  
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
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
  
            <button type="submit" className="btn btn-success w-100">Sign in</button>
          </form>
  
          <p className="text-center mt-3">
            New to Page?{" "}
            <span 
              className="text-primary text-decoration-none" 
              style={{ cursor: "pointer" }} 
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    );
};

export default Login;







