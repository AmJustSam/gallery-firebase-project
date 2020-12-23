import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import ProtectedRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import Home from "./components/home/home";
import Login from "./authentication/login";
import Signup from "./authentication/signup";
import Modal from "./components/modal/modal";

import LoginProvider from "./authentication/authContext";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <LoginProvider>
        <PublicRoute exact path="/login" component={Login}/>
        <PublicRoute exact path="/signup" component={Signup}/>
        <Switch location={background || location}>
          <ProtectedRoute exact path="/" component={Home}/>
          <Route exact path="/image/:name"  component={Modal} />
        </Switch>

        <Route path="/image" component={Modal} />
    </LoginProvider>
  )
};

export default App;