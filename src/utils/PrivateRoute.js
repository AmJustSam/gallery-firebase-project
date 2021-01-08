import React from "react";
import {Route, Redirect} from "react-router-dom";

import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = useSelector((state) => state.loggedIn);
  
  return(
    <Route {...rest}
      render={(props) => {
        if(user) {
          return <Component {...props} /> 
        } else {
          return <Redirect to="/login" />
        }
      }}
    />
  )
}

export default PrivateRoute;