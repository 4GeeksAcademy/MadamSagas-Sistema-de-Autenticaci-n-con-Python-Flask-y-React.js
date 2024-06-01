import React, { useState, Component, useContext, useEffect } from "react";
import { Context } from '../store/appContext'
import { Link, useNavigate } from "react-router-dom";

const Private = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const token = sessionStorage.getItem('jwt-token');
        if(!token){
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            const resp = await fetch('process.env.BACKEND_URL + "/api/private"', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (resp.ok) {
                const data = await resp.json();
                setUser(data.user);

            } else {
                sessionStorage.removeItem('jwt-token');
            }
        };

        fetchUser();
    }, [navigate]);

    if(!user){
        return <div>Loading....</div>;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="row">
                <h1>Welcom {user.email}</h1>
                <button className="btn btn-primary"
                onClick={() => {
                    sessionStorage.removeItem('jwt-token');
                    navigate('/login');

                }}>Logout</button>
                </div>


            </div>
            
            </div>


    );
    }

    

export default Private;