import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    let navigate=useNavigate();
    const [error,setError]=useState('');
    const[wait,setWait]=useState(false);
    const [user,setUser]=useState(
        {
            first_name: "",
            last_name: "",
            age: "",
            email: "",
            password: "",
          }
    )

  function getUser({ target }) {
    //get old user and add changes on it
    setUser({...user,[target.name]:target.value});
  }
  async function addUser(e){
    e.preventDefault();
    setWait(true);
    let {data}=await axios.post('https://route-egypt-api.herokuapp.com/signup',user);
    if(data.message === 'success')
    {
        //props.history.replace('/login');
        navigate('/login')
    }
    else
    {
        setError(data.message.split(',')[0])
    }
    setWait(false);
  }
  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={addUser}>
          <div className="row d-flex align-items-center justify-content-center container-height">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                  value={user.first_name}
                    type="text"
                    id="txtFirstName"
                    onChange={getUser}
                    name="first_name"
                    className="form-control my-3"
                    placeholder="ex: Mart"
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                  value={user.last_name}
                    type="text"
                    id="txtLastName"
                    onChange={getUser}
                    name="last_name"
                    className="form-control my-3"
                    placeholder="ex: Sherodenger"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="age">Age</label>
                  <input
                  value={user.age}
                    type="number"
                    id="txtAge"
                    onChange={getUser}
                    name="age"
                    className="form-control my-3"
                    placeholder="between 10-30"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="email">Email</label>
                  <input
                  value={user.email}
                    type="email"
                    id="txtEmail"
                    onChange={getUser}
                    name="email"
                    className="form-control my-3"
                    placeholder="user@anyDomain.com"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <label htmlFor="password">Password</label>
                  <input
                  value={user.password}
                    type="password"
                    id="txtPassword"
                    onChange={getUser}
                    name="password"
                    className="form-control my-3"
                    placeholder="alphabets and digits"
                  ></input>
                </div>
              </div>
              <div className="row">
                {error &&<div className="alert alert-danger text-danger">
                    {error}
                </div>}
                <div className="col-12 text-center">
                  <button className="btn btn-outline-light btn-block my-3">
                    {wait?<i className="fas fa-spinner fa-spin"></i>:'Sign up'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
