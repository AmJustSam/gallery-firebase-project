import React, { useEffect } from "react";
import {useLocation, Link} from "react-router-dom";

import {Wrapper, Container, Image, imgVariant, containerVariant} from "./galleryStyles";
import {genLowSrcset, genUrl, genLowUrl} from "../../utils/srcGenerator";

import {useSelector, useDispatch} from "react-redux";
import {getImages, removeImage, loadMore} from "../../actions/galleryActions";

import { confirmAlert } from 'react-confirm-alert';

function Gallery(){
  const images = useSelector((state) => state.gallery?.length > 0 ? state.gallery : false );
  const pagination = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
     dispatch(getImages());
  }, []);
  

  const confirmDelete = (e) => {
    if(e.target.classList.contains("delete-item")) {
      const userId = e.target.id;
      confirmAlert({
        title: 'Delete Image?',
        message: "This image will be permanently deleted.",
        buttons: [
          {
            label: 'Yes, Delete it!',
            onClick: () => dispatch(removeImage({id: userId}))
          },
          {
            label: 'No',
            onClick: () => false
          }
        ]
      });   
    }
  }

  const nextImages = () => {
    dispatch(loadMore());
  }

  return(
    <React.Fragment>
      {images &&
       <React.Fragment>
        <Container
          initial="hidden"
          animate="show"
          variants={containerVariant}
          onClick={confirmDelete}
       >
           {
             images.map((image) => (
               <Wrapper id="wrapper" key={image.id} >
                  <Link style={{display: "block"}} id={image.id} to={{pathname: `/img/${image.id}`, state: {background: location, imgFilename: image.filename, imgId: image.id}}}>
                    <Image layout variants={imgVariant}>
                      <img className="lazyload" id={image.id} data-sizes="auto" data-src={genUrl(image.filename)} data-srcset={genLowSrcset(image.filename)} src={genLowUrl(image.filename)} />
                    </Image>
                  </Link>
                  <div id="overlay">
                    <button id={image.id} className="delete-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
               </Wrapper>
             ))
           }
        </Container>
    
       { pagination && 
          <button id="loadmore" onClick={nextImages}>Load More</button>
       }
      </React.Fragment>
     }
    </React.Fragment>
  )
}

export default Gallery;