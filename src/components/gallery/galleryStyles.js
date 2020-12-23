import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
    margin-top: 50px;
    column-count: 3;
    column-gap: 20px;
    max-width: 1320px;

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

       &:hover {
         opacity: 0.8;
       }
     }
`;