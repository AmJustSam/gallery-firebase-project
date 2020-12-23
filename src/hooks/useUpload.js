import React, { useEffect, useState, useContext } from "react";
import {storage, firestore} from "../utils/firebase";
import firebase from "../utils/firebase";
import {LoginContext} from "../authentication/authContext";

const useUpload = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const user = useContext(LoginContext);

  useEffect(() => {
    const date = new Date();
    const time = date.getTime();

    if (file) {
      const storageRef = storage.ref(`gallery/${user.uid}/${time+"-"+file.name}`);
    
      const task = storageRef.put(file);
      task.on("state_changed", (snapshot) => {
         let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        firestore.collection("gallery").doc(user.uid).collection("images").add({url: url, uid: user.uid, createdAt: firebase.firestore.FieldValue.serverTimestamp()});
        setUrl(url);
      })
    } else {
      setError("Please select file");
    }
  }, [file]);

  return {progress, error, url};
}

export default useUpload;