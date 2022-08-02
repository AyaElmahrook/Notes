import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function Navbar({logOut,token}) {
  let {pathname}=useLocation();
  //console.log(pathname);
  return (
    <>
    <nav className="navbar navbar-expand navbar-dark shadow bg-transparent">
      <div className="container">
        <Link className="navbar-brand" to="home">Notes {token?`of ${token.first_name} ${token.last_name}`:''}</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token? <>
              <li className="nav-item">
              <Link onClick={logOut} className="nav-link" to="login">log out</Link>
            </li>
            </>:<>
            <li className="nav-item">
              <Link className="nav-link" to="register">Sign up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="login">Sign in</Link>
            </li>
            </>}
          </ul>
      </div>
    </nav>
</>
  )
}
