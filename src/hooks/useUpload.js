import { useEffect, useState } from "react";
import {storage} from "../utils/firebase";

import {useSelector, useDispatch} from "react-redux";
import {addImage} from "../actions/galleryActions";

const useUpload = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [filename, setFilename] = useState(null);
   
  const user = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();

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
        const filename = storageRef.fullPath;
        
        dispatch(addImage({filename: filename}));

        setFilename(filename);
      })
    } else {
      setError("Please select file");
    }
  }, [file]);

  return {progress, error, filename};
}

export default useUpload;