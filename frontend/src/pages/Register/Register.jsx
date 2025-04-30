import React, { useState } from "react";
import "./Register.css";
import Person from "../../assets/images/person.png";
import Password from "../../assets/images/password.png";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import HttpHandler from "../../data/HttpHandler";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const role = "customer";
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !fullname || !password) {
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

    const rBody = {
      role,
      username,
      fullname,
      password,
    };

    const res = await HttpHandler.request("register", "POST", null, rBody);

    const code = JSON.parse(res).code;
    const body = JSON.parse(res).body;
    const json = JSON.parse(body);

    Swal.close();

    if (code === 201) {
      Swal.fire("Success", "Register Successful", "success");
      navigate("/login");
    } else {
      Swal.fire("Error", `${json.error}`, "error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__form-container">
        <div className="register-page__form">
          <h1>Register</h1>
          <h3>Create your account and start your journey with us!</h3>

          <h2>Username</h2>
          <div className="register-form__input-wrapper">
            <img src={Person} alt="user" className="register-form__icon" />
            <input
              type="text"
              placeholder="Write your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <h2>Fullname</h2>
          <div className="register-form__input-wrapper">
            <img src={Person} alt="user" className="register-form__icon" />
            <input
              type="text"
              placeholder="Write your fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <h2>Password</h2>
          <div className="register-form__input-wrapper">
            <img src={Password} alt="password" className="register-form__icon" />
            <input
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleRegister}>Register</button>
          <h4>
            Old User?{" "}
            <Link to="/">
              <span> Login</span>
            </Link>
          </h4>
        </div>
      </div>

      <div className="register-page__banner">
        <h2>Hello, Friend</h2>
        <p>Join us to start your exciting journey.</p>
      </div>
    </div>
  );
}

export default Register;
