import React from "react";

import Nav from "../nav/nav";
import Header from "../header/header";
import Gallery from "../gallery/gallery";

import {Container} from "./homeStyles";


function Home(){
  return(
    <Container>
        <Nav />
        <Header />
        <Gallery />
    </Container>
  )
}

export default Home;