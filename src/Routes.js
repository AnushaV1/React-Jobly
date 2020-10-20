import React from "react";
import { Switch, Route} from  "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";
import Company from './Company';
import PrivateRoute from './PrivateRoute';
const Routes = ({addToken}) => {

    return(
        <div>
        <Switch>
        <Route exact path="/">
          <Home  />
        </Route>
        <Route exact path="/login">
          <Login addToken={addToken}/>
        </Route>
        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>
        <Route path="/companies/:handle">
        <Company />
        </Route>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
      </div>
    )
}

export default Routes;