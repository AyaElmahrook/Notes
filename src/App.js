import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useState } from 'react';
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'


function App() {
  const [token, setToken] = useState(null)
  function getToken() {
    setToken(jwtDecode(localStorage.getItem("token")))
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getToken();
    }
  }, [])
  //let navigator = useNavigate;
  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }
  //console.log(token);
  return (
    <>
      <Navbar logOut={logOut} token={token}></Navbar>
      <Routes>
        <Route element={<Login getToken={getToken} />} path="/" />
        <Route element={<ProtectedRoutes getToken={getToken}><Home/></ProtectedRoutes>} path="home" />
        <Route element={<Login getToken={getToken} />} path="login" />
        <Route element={<Register />} path="register" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
