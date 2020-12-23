import styled from "styled-components";

export const Container = styled.div`
    margin-top: 20px;
`;

export const Header = styled.header`
     display: flex;
     justify-content: space-between;
     align-items: center;

     h1 {
       font-size: 20px;
       color: pink;
     }
`;

export const Navigation = styled.nav`
    ul {
      list-style: none;
      display: flex;
      align-items: center;

      li {
        display: inline-block;
      }

      li:last-child {
        margin-left: 15px;

        button {
          background: white;
          border: 0;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: 600;
          color: #13151A;
          font-size: 16px;
        }
      }
    }
`;