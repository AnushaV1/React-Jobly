import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from './UserContext';
const Home = () => {
    const {user} = useContext(UserContext);
    return (
        <div className="Home">
          <div className="container text-center">
            <h1 className="mb-4 font-weight-bold">Jobly</h1>
            <p className="lead">All the jobs in one, convenient place.</p>
            {user ? (
              <h2>Welcome Back {user.first_name}!</h2>
            ) : (
              <Link className="btn btn-primary font-weight-bold" to="/login">
                Log in
              </Link>
            )}
          </div>
        </div>
      );
    }
    

export default Home;