import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Home/navbar";
import "../styles/Login.css";
import loginImage from "../images/image.png";
import google from "../images/google-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = async () => {
    await fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
            backdrop: `rgba(0, 0, 0, 0.4)`,
          });
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then(async (data) => {
        localStorage.setItem("rfkey", data.refreshToken);
        localStorage.setItem("isLogged", true);
        await setUsername();
        navigate("/"); // Redirect on successful login
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed",
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(0, 0, 0, 0.4)`,
        });
      });
  };

  const setUsername = async () => {
    await fetch("http://localhost:8081/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("username", data.username);
      })
      .catch((error) => {
        console.error("Error setting username:", error);
      });
  };

  function redirect(url) {
    window.location.href = url;
  }

  async function auth() {
    try {
      const response = await fetch(
        "http://localhost:8081/oauth/google/request",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);
      redirect(data.url);
    } catch (error) {
      console.error("Error in auth:", error);
    }
  }

  return (
    <>
      <Navbar />
      <section className="login-container">
        <div className="login-page">
          <div className="image-section">
            <img src={loginImage} alt="Side visual" className="login-image" />
          </div>
          <div className="form-section">
            <h2 className="text-center">Welcome to HerbMart!</h2>
            <h6 className="text-center">
              Please enter your email and password to access your account.
            </h6>
            <form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="form-group d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <button
                type="button"
                className="login-button"
                onClick={checkLogin}
              >
                LOGIN
              </button>

              <p className="text-center mt-3">or</p>

              <button
                type="button"
                className="google-signin"
                onClick={() => auth()}
              >
                <img src={google} alt="Google" className="google-logo" />
                Sign in with Google
              </button>

              <p className="text-center mt-4">
                Don't have an account?{" "}
                <a href="#!" className="signup-link">
                  Create New
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
