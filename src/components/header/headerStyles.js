import styled from "styled-components";

export const Container = styled.div`
   margin-top: 50px;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
`;

export const Upload = styled.form`
   display: inline-block;
   width: 100%;
   max-width: 500px;
   position: relative;
   margin-top: 50px;
   overflow: hidden;
   
   input {
     position: absolute;
     top: -100%;
     opacity: 0;
   }
    
   input:focus + #uploader {
      outline: 2px solid orange;
      box-shadow: 0 0 5px 0 orange;
   }

   .uploader {
     display: flex;
     justify-content: center;
     padding: 60px 0;
     background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='23' stroke-linecap='square'/%3e%3c/svg%3e");

     &:hover {
      cursor: pointer;
     }

   }

   .uploader.disable {
      &:hover {
         cursor: not-allowed;
      }
   }
`;

export const Heading = styled.h2`
   font-size: 50px;
`; 