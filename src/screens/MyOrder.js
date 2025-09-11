import React, { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") })
    })
      .then(res => res.json())
      .then(data => setOrderData(data.orderData || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      ></div>

      {/* Content */}
      <div className="container mt-4 p-4" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="mb-4 text-center text-light fw-bold">🍽 My Orders</h2>
        {orderData.length === 0 ? (
          <p className="text-center text-light bg-dark p-3 rounded shadow">
            You have not placed any orders yet.
          </p>
        ) : (
          orderData
            .slice(0)
            .reverse()
            .map((order, index) => {
              const totalPrice = (order.items || []).reduce(
                (sum, item) => sum + item.price,
                0
              );

              return (
                <div
                  key={index}
                  className="card shadow-lg mb-4 border-0"
                  style={{
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(0, 184, 148, 0.9), rgba(9, 132, 227, 0.9))",
                    backdropFilter: "blur(10px)",
                    color: "#fff"
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      📅 Order Date: {new Date(order.Order_date).toLocaleString()}
                    </h5>
                    <ul className="list-group list-group-flush mt-3">
                      {(order.items || []).map((item, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            border: "none"
                          }}
                        >
                          <span>
                            {item.name} ({item.size}) x {item.qty}
                          </span>
                          <span>₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-end fs-5 fw-bold">
                      💰 Total: ₹{totalPrice}
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
