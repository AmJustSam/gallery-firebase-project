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
    overflow: scroll;
    cursor: zoom-out;
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

    button {
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

export const Img = styled.div`
    position: relative;
    width: 100%;
    margin: 10px 0;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }

    .blur {
      filter: blur(20px);
    }
`;