import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {resetPassword} from "../utils/firebase";

import {Helmet} from "react-helmet";

import handleResetErrors from "../utils/handleResetErrors";

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100%;
   height: 100vh;
   margin-top: -40px;

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

function Reset(){
  const [msg, setMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email} = e.target.elements;

    resetPassword(email.value)
      .then(() => {
        setMsg("If this email exist in our database then you'll receive reset link shortly in your inbox.")
        email.value = "";
      }).catch((err) => {
        const errorMsg = handleResetErrors(err);
        setMsg(errorMsg);
        email.value = "";
      });
  }

  return(
    <React.Fragment>
      <Helmet>
         <title>Reset your Piczer account password</title>
      </Helmet>
      <h1 className="authPageLogo"><Link to="/">Piczer</Link></h1>     
      <Container>
        <div>
          {msg && <p className="auth-msg">{msg}</p>}
          <h1>Forgot your password?</h1>
          <p className="less-important">Please type your email below to receive a link to reset your password.</p>
          <div className="form-separator"></div>
          <Form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Type your email" required/>
            <Button color="white" bg="#7B4162" hv="#552340">Send Password Reset Email</Button>
          </Form>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Reset;