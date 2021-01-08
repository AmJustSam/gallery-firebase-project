import React, { useEffect, useState, useContext } from "react";
import {useParams} from "react-router-dom";

import {firestore} from "../../utils/firebase";
import {genSrcset, genUrl} from "../../utils/srcGenerator";

import {useSelector} from "react-redux";

const ImageView = () => {
  const [img, setImg] = useState(null);
  const user = useSelector((state) => state.loggedIn);
  const {name} = useParams();

  const getImage = async () => {
    const doc = await firestore.collection("gallery").doc(user.uid).collection("images").doc(name).get();
    const data = doc.data();
    setImg(data);
  }

  useEffect(() => {
    getImage();
  }, [])

  return (
    <React.Fragment>
      { img && 
       <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "calc(100vw - 70vw)",
          justifyContent: "center",
          alignItems: "center"
        }}
       >
        <img
          style={{
            width: "100%",
          }}
        id={img.id} src={genUrl(img.filename)} srcSet={genSrcset(img.filename)} />
       </div>
      }
    </React.Fragment>
  )
}

export default ImageView;