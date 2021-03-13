import styled from "styled-components";
import {motion} from "framer-motion";

export const Overlay = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0,0,0, 0.8);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%:
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    cursor: zoom-out;

   > button {
      align-self: flex-end;
      margin: 20px 20px 0 0;
      background: 0;
      border: 0;
      color: white;
      cursor: pointer;
      
      > * {
        pointer-events: none;
      }
    }
`;

export const Container = styled(motion.div)`
    background: #222;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
    border-radius: 5px;
`; 

export const Options = styled.div`
  display: flex;
  width: 100%;
  min-height: 32px;
  max-height: 32px;
  align-items: center;
  justify-content: flex-end;
  margin: 15px;


  > a {
    color: white;
    background: #7B4162;
    padding: 6px 15px;
    border-radius: 5px;
    text-decoration: none;
    margin-right: 5px;
    cursor: pointer;

    &:hover, &:active {
      color: white;
    }
  }
  
  > button {
    background: none;
    border: 0;
    color: white;
    padding: 10px 10px;
    cursor: pointer;

    > * {
      pointer-events: none;
    }
  }

`;

export const Img = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }
`;