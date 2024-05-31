import React, { useState, Component, useContext } from "react";
import { Context } from '../store/appContext'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {store, actions} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handdleClick = () => {
    console.log(email, password)
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
          fetch("https://fluffy-adventure-q7qp44rvp7pv3gvp-3001.app.github.dev/api/login", opts )
          .then(resp =>{
            if(!resp.ok) return resp.json()
            else alert ("There was an error!")
          })
          .then(data => {
            sessionStorage.setItem("token", data.access_token)
            console.log(data)
          })
          .catch(error =>{
            console.error("There was an error!", error)
            console.log(error.response)
          })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const resp = await fetch ('process.env.BACKEND_URL + "/api/login"', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json'},
  //     body: JSON.stringify({email, password})
  //   });
  //   if (resp.ok){
  //     const data = await resp.json();
  //     sessionStorage.setItem('jwt-token', data.access_token);
  //     navigate('/private')
  //   }else{
  //     console.error('Login failed')
  //   }
  // };

    return (
        <div className="container">
            <form > 
      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-6">
        <h1 className="mb-3">Log In</h1>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="form-control"
             placeholder="Email" 
             required
            aria-label="email"/>
        </div>
      </div>

      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-6">
          <input type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="form-control" 
          id="inputPassword3" 
          placeholder="Password" 
          required
          aria-label="password"/>
        </div>
        </div>
        <div className="row mb-3 d-flex mt-3 justify-content-center">
          <div className="col-6 d-grid gap-2 col-6 mx-auto">
              <button 
              onClick={handdleClick}
              className="btn btn-primary" type="button">
                Log In
                </button>
              </div>
        </div>
      
      
    <div className="row d-flex justify-content-center">
      <div className="col-6">
         <Link to="/signup">
            <a>Not a member? Sign Up</a>
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


    )
}
export default Login;