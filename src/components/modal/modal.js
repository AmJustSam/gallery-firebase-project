import React, { useEffect, useState, useRef } from "react";
import {useHistory, useLocation} from "react-router-dom";

import {Container, Img, Overlay} from "./modalStyles";

function Modal(){
  const [dimension, setDimension] = useState({});
  const docRef = useRef();
  const ImgContainer = useRef();
  const poll = useRef();
  const imgRef = useRef();
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.body.classList.add("noscroll");

    poll.current = setInterval(function () {
      if (imgRef.current.naturalWidth) {
          clearInterval(poll);
          const width = imgRef.current.naturalWidth;
          const height = imgRef.current.naturalHeight;  
          setDimension({width, height});
      }
    }, 10);

    const img = new Image();
    img.src = imgRef.current.dataset.img;
    
    img.onload = () => {
      console.log("Loaded");
      ImgContainer.current.insertBefore(img, imgRef.current);
      imgRef.current.style.display = "none";
    }

    return () => {
      document.body.classList.remove("noscroll");
      document.removeEventListener("keydown", handleKeyPress);
      clearInterval(poll.current);
    }
  }, [])

  const handleBlur = (e) => {
    if(e.target.classList.contains("close") || e.target.classList.contains("overlay")){
      history.push("/");
    }
  }

  const handleKeyPress = (e) => {
    if(e.key == "Escape") {
      console.log("Listetning");
      history.push("/");
    }
  }

  return( 
    <Overlay className="overlay" onClick={handleBlur}
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3, delay: 0.2}}
    >
        <Container>
             <button className="close">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
             <Img ref={(elm) => ImgContainer.current = elm} style={{maxWidth: `calc((100vh - 175px) * ${dimension.width/dimension.height})`}}>
                <img className="blur" data-img={location.state.source} ref={(elm) => imgRef.current = elm} src={location.state.source} alt=""/>
               
                <div style={{paddingBottom: (dimension.height / dimension.width) * 100 + "%"}}></div>
             </Img>

             {/* <div id="colors">
               <span style={{display: "inline-block", background: "#444", padding: "10px 15px", marginRight: "2px"}}></span>
               <span style={{display: "inline-block", background: "#444", padding: "10px 15px", marginRight: "2px"}}></span>
               <span style={{display: "inline-block", background: "#444", padding: "10px 15px", marginRight: "2px"}}></span>
               <span style={{display: "inline-block", background: "#444", padding: "10px 15px", marginRight: "2px"}}></span>
             </div> */}
        </Container>
    </Overlay>
  )
}

export default Modal;