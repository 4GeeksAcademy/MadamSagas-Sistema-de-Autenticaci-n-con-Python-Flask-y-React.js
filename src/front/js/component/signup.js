import React, { useState, Component, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch('process.env.BACKEND_URL + "/api/singup"', {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (resp.ok) {
      navigate("/login");
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-6">
            <h1 className="mb-3">Sign Up!</h1>
            <input
              type="email"
              value={email}
              class="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              aria-label="email"
            />
          </div>
        </div>

        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
              required
              aria-label="password"
            />
          </div>
        </div>

        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-6 d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-success" type="submit">
              Sign Up
            </button>
          </div>
        </div>

        <div className="row mb-1 d-flex justify-content-center">
          <div className="col-6">
            <Link to="/login">
              <a> Alredy a member? Log In</a>
            </Link>
          </div>
        </div>

        <div className="row mb- d-flex justify-content-center">
          <div className="col-6">
            <Link to="/">
              <a>Go back home</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Signup;
