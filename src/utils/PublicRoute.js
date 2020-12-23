import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {LoginContext} from "../authentication/authContext";

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = useContext(LoginContext);
  
  return(
    <Route  {...rest}
      render={(props) => {
        if(!user) {
          return <Component {...props} /> 
        } else {
          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRoute;