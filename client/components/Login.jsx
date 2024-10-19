import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handle form submission and submist logic

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(true); // Update the login state to true
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        console.error("Login failed:", data);
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // prevent refresh on submit

  //   if (username === 'user' && password === 'password') {
  //     onLoginSucess(); // call parent func if login is right
  //   } else {
  //     // show alert if login is wrong
  //     alert('invalid login');
  //   }
  // };

  return (
    <div className="loginBody">
      <div className="loginComponent">
        <h2 className="pageTitle">HOAme</h2>
        <p className="mantra">You're almost hoame</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="loginPrompt"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="loginPrompt"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginButton">
          <button onClick={handleLogin} type="submit" className="loginButton1">
            Login
          </button>

          <button
            onClick={() => alert("Google login clicked")}
            className="loginButton1"
          >
            {" "}
            Login with Google{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
