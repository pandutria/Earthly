import React from "react";
import "./Login.css";
import Person from "../../assets/images/person.png";
import Password from "../../assets/images/password.png";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import HttpHandler from "../../data/HttpHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import DataStorage from "../../helper/DataStorage";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("All fields must be filled");
      return;
    }

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const rBody = { username, password };
    const res = await HttpHandler.request("login", "POST", null, rBody);
    const code = JSON.parse(res).code;
    const body = JSON.parse(res).body;

    Swal.close();

    if (code == 201) {
      const json = JSON.parse(body);
      const role = json.user.role;

      if (role === "admin") {
        navigate("/main/admin");
      } else {
        navigate("/main/customer");
      }

      DataStorage.saveToken(json.token);
      console.log(json.token)
      Swal.fire("Success", "Login Successful", "success");
    }

    if (code == 401) {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-left">
        <div className="auth-logo">
          <img src={Logo} alt="logo" />
          <h1>Earthly</h1>
        </div>
        <h2>Welcome <br />Back!</h2>
      </div>

      <div className="auth-right-wrapper">
        <div className="auth-right">
          <h1>Login</h1>
          <h3>Welcome back! Please login to your account</h3>

          <h2>Username</h2>
          <div className="auth-input-group">
            <img src={Person} alt="user" className="auth-icon" />
            <input 
              type="text"
              placeholder="Write your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <h2>Password</h2>
          <div className="auth-input-group">
            <img src={Password} alt="password" className="auth-icon" />
            <input 
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button onClick={handleLogin}>Login</button>
          <h4>
            New User? <Link to="/register"><span>Sign Up</span></Link>
          </h4>
        </div>
      </div>
    </section>
  );
}

export default Login