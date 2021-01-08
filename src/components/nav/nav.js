import React from "react";
import {signOut} from "../../utils/firebase";
import {useSelector} from "react-redux";

import {Container, Header, Navigation} from "./navStyles";


function Nav(){
  const user = useSelector((state) => state.loggedIn);

  return(
    <Container>
      <Header>
         <h1>Piczer</h1>   
         <Navigation>
           <ul>
             {user ?
              <li style={{cursor: "pointer"}} onClick={() => signOut()}>Logout</li> :
              <React.Fragment>
                <li><a tabindex="0">Login</a></li>
                <li><button>Signup</button></li>
              </React.Fragment>
             }         
           </ul>
         </Navigation>
      </Header>
    </Container>
  )
}

export default Nav;