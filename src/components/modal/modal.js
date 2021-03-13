import React, { useEffect, useState, useRef, useContext } from "react";
import {useHistory, useParams, Link} from "react-router-dom";

import {Container, Img, Overlay, Options} from "./modalStyles";
import {genSrcset, genUrl, genLowUrl, genDownloadUrl} from "../../utils/srcGenerator";

import {firestore} from "../../utils/firebase";
import {useSelector, useDispatch} from "react-redux";
import {removeImage} from "../../actions/galleryActions";

import {disableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';

function Modal(){
  const user = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [dimension, setDimension] = useState({});
  const [confirm, setConfirm] = useState(false);
  
  const poll = useRef();
  const imgRef = useRef();
  const history = useHistory();
  const {imgFilename, imgId} = history.location.state || {imgFilename: "", imgId: ""};
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
      setImg({filename: imgFilename, id: imgId});
    } else {
      try {
        const doc = await firestore.collection("gallery").doc(user.uid).collection("images").doc(name).get();
        const data = {id: doc.id, ...doc.data()};
        setImg(data);  
      } catch (err) {
        history.push("/");
      }
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

  const confirmDelete = (value) => {
    
    // if(e.target.classList.contains("delete-item")) {
    //   const userId = e.target.id;
    //   confirmAlert({
    //     title: 'Delete Image?',
    //     message: "This image will be permanently deleted.",
    //     buttons: [
    //       {
    //         label: 'Yes, Delete it!',
    //         onClick: () => { 
    //           dispatch(removeImage({id: userId}));
    //           history.replace("/");
    //         }
    //       },
    //       {
    //         label: 'No',
    //         onClick: () => false
    //       }
    //     ]
    //   });   
    // }
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
            <Options>
              {img &&
                <React.Fragment> 
                  {confirm ?
                    <ReactConfirmAlert
                        title='Delete Image?'
                        message="This image will be permanently deleted."
                        buttons={[
                          {
                            label: 'Yes, Delete it!',
                            onClick: () => { 
                              dispatch(removeImage({id: img.id}));
                              history.replace("/");
                            }
                          },
                          {
                            label: 'No',
                            onClick: () => setConfirm(false)
                          }
                        ]}
                    /> :
                    <React.Fragment>
                      <a href={genDownloadUrl(img.filename)}>Download Image</a>
                      <button className="delete-item" onClick={() => setConfirm(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </React.Fragment>
                  }
                </React.Fragment>
              }
             </Options>
             <Img style={{maxWidth: `calc((100vh - 200px) * ${dimension.width/dimension.height})`}}>
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