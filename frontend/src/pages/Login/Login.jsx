import React from "react";
import "./Login.css"; // pastikan path ini sesuai
import Person from "../../assets/images/person.png";
import Password from "../../assets/images/password.png";
import Logo from "../../assets/images/logo.png"
import BackgroundImage from "../../assets/images/login.png"; // ganti nama file jika perlu

function Login() {
  return (
    <section className="section">
      <div className="left">
        <div className="logo-container">
          <img src={Logo} alt="" />
          <h1>Earthly</h1>
        </div>
        <h2>Welcome <br/>Back</h2>
      </div>

      <div className="right-container">
        <div className="right">
          <h1>Login</h1>
          <h3>Welcome back! Please login to your account</h3>

          <h2>Username</h2>
          <div className="input-wrapper">
            <img src={Person} alt="user" className="input-icon" />
            <input type="text" placeholder="Write your username" />
          </div>

          <h2>Password</h2>
          <div className="input-wrapper">
            <img src={Password} alt="password" className="input-icon" />
            <input type="password" placeholder="Write your password" />
          </div>

          <button>Login</button>
          <h4>
            New User? <span>Sign Up</span>
          </h4>
        </div>
      </div>
    </section>
  );
}

export default Login;
