import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    const bodyData = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <h1>Expense Intelligence</h1>
        <p>Smart Financial Management for Modern Users</p>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <h2>{isLogin ? "Login" : "Register"}</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Continue</button>
          </form>

          <p className="toggle-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? " Register" : " Login"}
            </span>
          </p>

          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;