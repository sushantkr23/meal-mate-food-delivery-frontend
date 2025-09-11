import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("Signup Successful!");
      localStorage.setItem("userEmail", credentials.email);
      if (json.authToken) {
        localStorage.setItem("authToken", json.authToken);
      }
      navigate("/login");
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative"
    }}>
      {/* overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))"
      }} />

      {/* signup card */}
      <div style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(12px)",
        padding: "50px 40px",
        borderRadius: "20px",
        width: "500px",
        maxWidth: "90%",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        zIndex: 1
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: "bold",
          color: "#fff"
        }}>
          Create Account 🍕
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">Name</label>
            <input
              type="text"
              className="form-control"
              name='name'
              value={credentials.name}
              onChange={onChange}
              style={{ borderRadius: "10px", padding: "10px", backgroundColor: "rgba(255,255,255,0.85)" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control"
              name='email'
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ borderRadius: "10px", padding: "10px", backgroundColor: "rgba(255,255,255,0.85)" }}
            />
            <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" style={{ borderRadius: "10px", padding: "10px", backgroundColor: "rgba(255,255,255,0.85)" }} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputlocation1" className="form-label text-light">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputlocation1" style={{ borderRadius: "10px", padding: "10px", backgroundColor: "rgba(255,255,255,0.85)" }} />
          </div>

          {/* buttons in one line */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="submit" className="btn btn-success w-50" style={{ padding: "10px", borderRadius: "10px" }} >
              Signup
            </button>
            <Link className="btn btn-danger w-50" to="/login" style={{ padding: "10px", borderRadius: "10px", textAlign: "center" }} >
              Already a User
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
