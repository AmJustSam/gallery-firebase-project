import React, { useEffect, useState, useRef, useContext } from "react";
import {useHistory, useParams} from "react-router-dom";

import {Container, Img, Overlay} from "./modalStyles";
import {genSrcset, genUrl, genLowUrl} from "../../utils/srcGenerator";

import {firestore} from "../../utils/firebase";
import {useSelector} from "react-redux";

import {disableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";

function Modal(){
  const user = useSelector((state) => state.loggedIn);
  const [img, setImg] = useState(null);
  const [dimension, setDimension] = useState({});
  
  const poll = useRef();
  const imgRef = useRef();
  const history = useHistory();
  const {imgFilename} = history.location.state;
  const {name} = useParams();

  const overlayRef = useRef();

  useEffect(() => {
    getImage();

    document.addEventListener("keydown", handleKeyPress);
    disableBodyScroll(overlayRef.current, {reserveScrollBarGap: true});
   

    poll.current = setInterval(function () {
      if (imgRef.current?.naturalWidth) {
          clearInterval(poll);
          const width = imgRef.current.naturalWidth;
          const height = imgRef.current.naturalHeight;  
          setDimension({width, height});
      }
    }, 10);

    return () => {
      clearAllBodyScrollLocks(overlayRef.current);
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(poll.current);
    }
  }, [])

  const getImage = async () => {
    if (imgFilename) {
      setImg({filename: imgFilename});
    } else {
      const doc = await firestore.collection("gallery").doc(user.uid).collection("images").doc(name).get();
      const data = doc.data();
      setImg(data);  
    }
  }

  const handleBlur = (e) => {
    if(e.target.classList.contains("close") || e.target.classList.contains("overlay")){
      history.goBack();
    }
  }

  const handleKeyPress = (e) => {
    if(e.key == "Escape") {
      history.goBack();
    }
  }

  return( 
    <Overlay className="overlay" onClick={handleBlur}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3, delay: 0.2}}
      
    >
       <button style={{position: "absolute", top: "-10px", left: "0px", padding: "10px"}} className="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="3" 
             strokeLinecap="round" strokeLinejoin="round" 
             className="feather feather-x">
             <line x1="18" y1="6" x2="6" y2="18"></line>
             <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <Container ref={(elm) => overlayRef.current = elm}>
             <Img style={{maxWidth: `calc((100vh - 20px) * ${dimension.width/dimension.height})`}}>
                {img && 
                  <img className="lazyload" data-sizes="auto" src={genLowUrl(img.filename)} data-src={genUrl(img.filename)} data-srcset={genSrcset(img.filename)} ref={(elm) => imgRef.current = elm} alt=""/>                
                }
               
                <div style={{paddingBottom: (dimension.height / dimension.width) * 100 + "%"}}></div>
             </Img>
        </Container>
    </Overlay>
  )
}

export default Modal;