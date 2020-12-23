import React, { useState, useEffect, createContext } from "react";
import {auth} from "../utils/firebase";

export const LoginContext = createContext();

export default function LoginProvider(props) {
  var [user, setUser] = useState(false);
  var [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((obj) => {
      if(obj){
        setUser(obj);
        console.log(obj);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(false);
      }
    })

    return unsubscribe;
  }, [])


  return (
    <LoginContext.Provider value={user}>
      {!loading && props.children}
    </LoginContext.Provider>
  );
}
