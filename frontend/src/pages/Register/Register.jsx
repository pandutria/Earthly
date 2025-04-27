import React from "react";
import "./Register.css"; 
import Person from "../../assets/images/person.png";
import Password from "../../assets/images/password.png";
import Logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import HttpHandler from "../../data/HttpHandler";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const role = "customer"
  const navigate = useNavigate()

  const handleRegister = async() => {

    if (!username || !fullname, !password) {
      alert("All fields must be filled")
      return
    }

    Swal.fire({
      title: 'Loading',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const rBody = {
      role: role,
      username: username,
      fullname: fullname,
      password: password
    }

    const res = await HttpHandler.request(
      "register",
      "POST",
      null,
      rBody
    )

    const code = JSON.parse(res).code
    const body = JSON.parse(res).body
    const json = JSON.parse(body)

    Swal.close()

    if (code == 201) {
      Swal.fire("Success", "Register Successful", "success")
      navigate("/login")
    } else {
      Swal.fire("Eror", `${json.error}`, "error")
    }
  }


    return (
         <section className="section">
             
              <div className="right-container">
                <div className="right">
                  <h1>Register</h1>
                  <h3>Create your account and start your journey with us!</h3>
        
                  <h2>Username</h2>
                  <div className="input-wrapper">
                    <img src={Person} alt="user" className="input-icon" />
                    <input type="text" 
                    placeholder="Write your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                  </div>

                  <h2>Fullname</h2>
                  <div className="input-wrapper">
                    <img src={Person} alt="user" className="input-icon" />
                    <input type="text"
                    placeholder="Write your fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)} />
                  </div>
        
                  <h2>Password</h2>
                  <div className="input-wrapper">
                    <img src={Password} alt="password" className="input-icon" />
                    <input type="password" 
                    placeholder="Write your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  />
                  </div>
        
                  <button onClick={handleRegister}>Register</button>
                  <h4>
                    Old User? <Link to="/"><span> Login</span></Link> 
                  </h4>
                </div>
              </div>

              <div className="left">
                <h2>Hello, Friend</h2>
                <p>Join us to start your exciting journey.</p>
              </div>
            </section>
    );
}

export default Register

