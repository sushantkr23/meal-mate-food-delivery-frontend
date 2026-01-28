import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://meal-mate-food-delivery-backend.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
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
      {/* overlay (soft gradient) */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.6))"
      }} />

      {/* login card (glass effect) */}
      <div style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(15px)",
        padding: "50px 40px",
        borderRadius: "20px",
        width: "450px",
        maxWidth: "90%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        zIndex: 1
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: "bold",
          color: "#fff"
        }}>
          Login to Food Delivery 🍔
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control"
              name='email'
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{
                borderRadius: "12px",
                padding: "12px",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #ccc",
                color: "#1f2937",
                fontSize: "1rem",
                transition: "all 0.3s ease"
              }}
              onFocus={e => e.target.style.boxShadow = "0 0 8px rgba(59,130,246,0.7)"}
              onBlur={e => e.target.style.boxShadow = "none"}
            />
            <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              style={{
                borderRadius: "12px",
                padding: "12px",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #ccc",
                color: "#1f2937",
                fontSize: "1rem",
                transition: "all 0.3s ease"
              }}
              onFocus={e => e.target.style.boxShadow = "0 0 8px rgba(59,130,246,0.7)"}
              onBlur={e => e.target.style.boxShadow = "none"}
            />
          </div>

          <button type="submit"
            className="btn w-100"
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Login
          </button>

          <Link
            className='w-100 d-block text-center mt-3'
            to="/signup"
            style={{
              padding: "12px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #EF4444, #DC2626)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
  )
}
