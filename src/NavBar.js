import React, {useContext} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

function NavBar({logout}) {
  const {user} = useContext(UserContext);
  return (
    <div>
  <nav className="navbar navbar-expand navbar-custom">
    <div className="container-fluid">
      <div className="navbar-header">
      <NavLink exact to="/" className="navbar-brand">
        Jobly
      </NavLink>
      </div>
      <ul className="nav navbar-nav navbar-right"> 
    { user ? (<>
    <li className="nav-item"> 
      <NavLink to="/companies">Companies</NavLink>
    </li>
      <li className="nav-item">
      <NavLink to="/jobs">Jobs</NavLink>
      </li>
      <li className="nav-item">
      <NavLink to="/profile">Profile</NavLink>
      </li>
      <li className="nav-item">
          <NavLink to='/' onClick={logout}>
									Logout
								</NavLink>
      </li> </>) : (
    <> 
    <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
    
    </> ) }

    </ul>
  </div>
  </nav>
  </div>
  )
}

export default NavBar;


