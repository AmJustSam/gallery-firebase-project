import React, { useEffect, useContext, useState } from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import { firestore } from "../../utils/firebase";
import {LoginContext} from "../../authentication/authContext";
import { AnimateSharedLayout, motion } from "framer-motion";

import {Container, Image} from "./galleryStyles";

const containerVariant = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delay: 1,
      duration: 0.3,
    }
  },
}

const imgVariant = {
  hidden: {opacity: 0},
  show: {opacity: 1}
}

function Gallery(){
  const location = useLocation();
  const history = useHistory();
  const [images, setImages] = useState(null);
  const user = useContext(LoginContext);

  useEffect(() => {
    const listener = firestore.collection("gallery").doc(user.uid).collection("images").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
         return {id: doc.id, ...doc.data()}
      })

      setImages([...docs]);
      console.log(docs);
    })

    return () => {
      listener();
    }
  }, [])

  const handleClick = (e) => {
    const elm = e.target;
    if(elm.nodeName == "IMG") {
      history.push(`/image/${elm.id}`, {background: location, source: elm.src});
    }
  }

  return(
    <React.Fragment>
      {images && 
       <Container onClick={handleClick}
          initial="hidden"
          animate="show"
          variants={containerVariant}
       >
           {
             images.map((image) => (
               <Image layout key={image.id}
                 variants={imgVariant}
               >
                 <motion.img id={image.id}src={image.url} />
               </Image>
             ))
           }
       </Container>
     }
    </React.Fragment>
  )
}

export default Gallery;