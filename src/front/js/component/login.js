import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    let todoSaleBien = false;
    fetch(
      "https://fluffy-adventure-q7qp44rvp7pv3gvp-3001.app.github.dev/login",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => {
        if (resp.ok) {
          todoSaleBien = true;
          return resp.json();
        }
      })
      .then((data) => {
        sessionStorage.setItem("token", data.access_token);
        if (todoSaleBien) {
          navigate("/private");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("invalid password or email");
      });
  };

  return (
    <div className="container">
      <form>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-6">
            <h1 className="mb-3">Log In</h1>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
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
        <div className="row mb-3 d-flex mt-3 justify-content-center">
          <div className="col-6 d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => {
                handleLogin();
              }}
              className="btn btn-primary"
              type="button"
            >
              Log in
            </button>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <Link to="/signup">
              <a>Not a member? Sign up</a>
            </Link>
          </div>
        </div>

        <div className="row mb-1 d-flex justify-content-center">
          <div className="col-6">
            <Link to="/">
              <a>Home</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
