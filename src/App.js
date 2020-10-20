import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from './UserContext';
import {decode} from 'jsonwebtoken';
import './App.css';
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./JoblyApi";

function App() {
  const INITIAL_VALUE = localStorage.getItem('jobly-token') || null;
  const [user, setUser] = useState(null);
  const [token, setToken]= useState(INITIAL_VALUE);
  const [infoLoaded, setInfoLoaded] = useState(false);
  
  useEffect(()=> {
    async function getUser() {
      try {
          let { username } = decode(token);
          let currentUser = await JoblyApi.getUser(username);
          setUser(currentUser);
      } catch(err){
        setUser(null);
      }
      setInfoLoaded(true);
    }
    if(!token) {
      localStorage.removeItem('jobly-token');
    } else {
      localStorage.setItem('jobly-token',token);
    }
    setInfoLoaded(false);
    getUser();
  }, [token]);

  const addToken = (token) => {
    setToken(token);
  }
  const logout = () => {
    setUser(null);
    setToken(null);
  }
  
  if(!infoLoaded) {
        return <p>Loading &hellip;</p>;
    }

  return (
    <div className="App">
          <BrowserRouter>
          <UserContext.Provider value={{user, setUser}}>
        <NavBar logout={logout} />
        <Routes addToken={addToken} />
        </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
