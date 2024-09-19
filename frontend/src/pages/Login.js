import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Home/navbar"; // Import the Navbar component
import "../styles/Login.css"; // Import a CSS file for custom styles
import loginImage from "../images/image.png";
import google from "../images/google-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/getCsrfToken", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  const checkLogin = async () => {
    await fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
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
          navigate("/my-account");
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then(async (data) => {
        localStorage.setItem("rfkey", data.refreshToken);
        localStorage.setItem("isLogged", true);
        await setUsername();
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
        "CSRF-Token": csrfToken,
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

  return (
    <>
      <Navbar /> {/* Add the Navbar component */}
      <section className="login-container">
        <div className="login-page">
          <div className="image-section">
            <img
              src={loginImage} // Replace this with your image path
              alt="Side visual"
              className="login-image"
            />
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

              <button type="button" className="google-signin">
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
