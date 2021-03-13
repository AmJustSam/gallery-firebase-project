import React, {useEffect} from "react";
import Nav from "../nav/nav";
import Header from "../header/header";
import Gallery from "../gallery/gallery";

import {Helmet} from "react-helmet";

import {Container} from "./homeStyles";

//import {auth, functions} from "../../utils/firebase";


function Home(){
  // useEffect(() => {
  //    const verify = functions.httpsCallable("handleReset");

  //    verify().then((res) => {
  //      console.log(res);
  //    }).catch((err) => {
  //      console.log(err);
  //    })
  // }, [])

  return(
    <Container>
        <Helmet>
           <title>Piczer Homepage</title>
        </Helmet>
        <Nav />
        <Header />
        <Gallery />
    </Container>
  )
}

export default Home;