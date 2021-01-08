import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {signUp, googleSignup} from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";


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

function Signup(){
  const [error, setError] = useState(false);
  
  const handleOAuth = () => {
    googleSignup().then((user) => {
     // console.log(user);
    }).catch((err) => {
      const errorMsg = handleAuthErrors(err, "signup");
      setError(errorMsg);        
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = e.target.elements;
    
    signUp(email.value, password.value)
      .then((user) => {
      }).catch((err) => {
        const errorMsg = handleAuthErrors(err);
        setError(errorMsg);
      });
  }

  return(
    <Container>
      <div>
        <h1 className="authPageLogo"><Link to="/">Piczer</Link></h1>   
        {error && <p className="auth-msg">{error}</p>}
        <h1>Create account</h1>
        <div className="form-separator-large"></div>
        <Button onClick={handleOAuth}><FcGoogle style={{verticalAlign: "middle", fontSize: "25px", marginRight: "10px"}} />Signup with Google</Button>
        <div className="form-separator"><p>Or</p></div>
        <Form onSubmit={handleSubmit}>
         <label>
            Email
            <input name="email" type="email" placeholder="Type your email" required/>
          </label>
          <label>
            Password
            <input name="pass" type="password" placeholder="Type your password" required/>
          </label>
          <Button color="white" bg="#7B4162" hv="#552340">Signup</Button>
          <div className="form-separator"></div>
          <p className="center">Already have an account? <Link to="/login">Login!</Link></p>
        </Form>
      </div>
    </Container>
  )
}

export default Signup;