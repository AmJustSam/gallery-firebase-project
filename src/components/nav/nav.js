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
             {user &&
              <li style={{cursor: "pointer"}} onClick={() => signOut()}><button style={{cursor: "pointer"}}>Logout</button></li>
             }         
           </ul>
         </Navigation>
      </Header>
    </Container>
  )
}

export default Nav;