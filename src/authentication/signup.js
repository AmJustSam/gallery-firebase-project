import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {signUp} from "../utils/firebase";

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100vh;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;  

  input {
     display: block;
     margin-bottom: 20px;
     padding: 10px 15px;
     width: 100%;
     border-radius: 5px;
   }
   
   p {
    margin-bottom: 20px;

    a {
      color: #aaa;
    }
  }

   button {
     width: 100%;
     padding: 15px 0;
     background: #7B4162;
     color: white;
     border: 0;
     border-radius: 5px;
     cursor: pointer;
     transition: background 200ms ease-in-out;

     &:hover {
      background: #552340;
     }
   }
`;

function Signup(){
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = e.target.elements;

    signUp(email.value, password.value)
      .then((user) => {
          setSuccess(true)     
      }).catch((err) => {
        console.log(err);
        alert("Something went wrong!")
      });
  }

  return(
    <Container>
      <Form onSubmit={handleSubmit}>
        { success && <p>Account succesffuly created, please <Link to="/login">login</Link></p> }
        <h1>Create account</h1>
        <input name="email" type="email" placeholder="Type your email" required/>
        <input name="password" type="password" placeholder="Type your password" required/>
        <p>Already have an account? <Link to="/login">Login!</Link></p>
        <button>Signup</button>
      </Form>
    </Container>
  )
}

export default Signup;