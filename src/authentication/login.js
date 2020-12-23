import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {signIn, signInEmailLink} from "../utils/firebase";

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

function Login(){
  const [msg, setMsg] = useState(null);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    const {email, pass} = e.target.elements;
      
    signIn(email.value, pass.value)
      .then((user) => {
        console.log(user);
        history.push("/");
      }).catch((err) => {
        console.log(err);
        setMsg(true);
      })
  }

  return(
    <Container>
      <Form onSubmit={handleLogin}>
        {msg &&
          <h2>email or password is incorrect!</h2>
        }
        <h1>Login</h1>
        <input name="email" type="email" placeholder="Type your email" required/>
        <input name="pass" type="password" placeholder="Type your password" required/>
        <p>No account? <Link to="/signup">Creat one!</Link></p>
        <button>Login</button>
        {/* <div id="recaptcha-container"></div> */}
      </Form>
    </Container>
  )
}

export default Login;