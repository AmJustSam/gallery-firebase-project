import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

import {signIn, googleSignup} from "../utils/firebase";
import handleAuthErrors from "../utils/handleAuthErrors";

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100%;
   height: 100vh;

   div {
    width: 100%;
    max-width: 350px; 
    
    @media screen and (max-width: 370px) {
        max-width: 300px;
    }

    p {
      margin-bottom: 20px;

     a {
       color: #aaa;
     }
    }
   }
`;

const Form = styled.form`
  input {
     display: block;
     margin-bottom: 20px;
     padding: 10px 15px;
     width: 100%;
     border-radius: 5px;
   }
`;

const Button = styled.button`
     width: 100%;
     padding: 15px 0;
     background: ${(props) => props.bg || "#fff"};;
     color: ${(props) => props.color || "#000"};
     border: 0;
     border-radius: 5px;
     cursor: pointer;
     transition: background 200ms ease-in-out;

     &:hover {
      background: ${(props) => props.hv || "rgba(255,255,255, 0.8)"};
     }

     > * {
       pointer-events: none;
     }
`;

function Login(){
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleOAuth = () => {
    googleSignup().then((user) => {
     // console.log(user);
    }).catch((err) => {
      const errorMsg = handleAuthErrors(err, "login");
      setError(errorMsg);        
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const {email, pass} = e.target.elements;
      
    signIn(email.value, pass.value)
      .then((user) => {
        history.push("/");
      }).catch((err) => {
        const errorMsg = handleAuthErrors(err);
        setError(errorMsg);
      })
  }

  return(
    <Container>
      <div>
        <h1 className="authPageLogo"><Link to="/">Piczer</Link></h1>   
        {error &&
            <p className="auth-msg">{error}</p>
        }
        <h1>Login</h1>
        <div className="form-separator-large"></div>
        <Button onClick={handleOAuth}><FcGoogle style={{verticalAlign: "middle", fontSize: "25px", marginRight: "10px"}} />Login with Google</Button>
        <div className="form-separator"><p>Or</p></div>
        <Form onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Type your email" required/>
          </label>
          <label>
            Password
            <p style={{float: "right"}}><Link to="/reset-password">Forgot your password?</Link></p>
            <input name="pass" type="password" placeholder="Type your password" required/>
          </label>
          <Button color="white" bg="#7B4162" hv="#552340">Login</Button>
          <div className="form-separator"></div>
          <p className="center">Don't have an account yet? <Link to="/signup">Creat one!</Link></p>
        </Form>
      </div>
    </Container>
  )
}

export default Login;