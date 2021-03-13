import React, {Suspense} from "react";
import {Switch, useLocation} from "react-router-dom";
import ProtectedRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

const Home  = React.lazy(() => import("./components/home/home"));
const Login = React.lazy(() => import("./authentication/login"));
const Reset = React.lazy(() => import("./authentication/reset"));
const Signup = React.lazy(() => import( "./authentication/signup"));

import Modal from "./components/modal/modal";

import {useSelector} from "react-redux";

function App() {
  const loading = useSelector((state) => state.loading);

  const location = useLocation();
  const background = location.state && location.state?.background;

  return (
    <React.Fragment>
      {loading && 
        <Suspense fallback={<div>Loading...</div>}>
            <PublicRoute exact path="/login" component={Login}/>
            <PublicRoute exact path="/signup" component={Signup}/>
            <PublicRoute exact path="/reset-password" component={Reset}/>
            
            <Switch location={background || location}>
              <ProtectedRoute exact path="/" component={Home}/>
              <ProtectedRoute exact path="/img/:name"  component={Modal} />
            </Switch>

            {background && 
              <ProtectedRoute exact path="/img/:name"  component={Modal} />
            }
        </Suspense>
     }
    </React.Fragment>
  )
};

export default App;