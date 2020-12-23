import styled from "styled-components";
import React, { useEffect, useState } from "react";
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
   const {progress, url} = useUpload(file);

   useEffect(() => {
     if(url) {
       setFile(null);
       setUploader(true);
     }
   }, [url, setFile]);
   
   return (
    <Progress style={{width: progress + "%"}} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress || 0 + "%"}</Progress>
   )
}

export default ProgressBar;