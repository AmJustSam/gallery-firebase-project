import styled from "styled-components";
import React, { useEffect } from "react";
import useUpload from "../../hooks/useUpload";

const Progress = styled.div`
   align-self: flex-start;
   margin-top: 25px;
   background: #7B4162;
   border-radius: 0;
   text-indent: -100vw;
   overflow: hidden;
`; 

function ProgressBar({file, setFile, setUploader}) {
   const {progress, filename} = useUpload(file);

   useEffect(() => {
     if(filename) {
       setFile(null);
       setUploader(true);
     }
   }, [filename, setFile]);
   
   return (
    <Progress style={{width: progress + "%"}} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress || 0 + "%"}</Progress>
   )
}

export default ProgressBar;