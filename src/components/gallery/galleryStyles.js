import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const Container = styled(motion.div)`
    margin: 50px auto;
    column-count: 3;
    column-gap: 20px;

    #wrapper {
      position: relative;  
    
      #overlay {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0, 0.4);
        pointer-events: none;

        button {
          pointer-events: auto;
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 10px;
          border-radius: 5px;
          border: 0;
          cursor: pointer;

          > * {
            pointer-events: none;
          }
        }
      }
 
      &:hover > #overlay {
        display: block;
      }
    }

    @media screen and (max-width: 1000px) {
      column-count: 2;
    }

    @media screen and (max-width: 750px) {
      column-count: 1;
    }
`;

export const Image = styled(motion.div)`
     margin-bottom: 20px;
     cursor: zoom-in;

     img {
       width: 100%;
     }
`;


// Motion Variants

export const containerVariant = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  },
}

export const imgVariant = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      duration: 0.1
    }
  }
}