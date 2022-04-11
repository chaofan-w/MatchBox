import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";

const Header = () => {
  const { loginState, setLoginState } = useContext(LoginContext);
  console.log(loginState);
  return (
    <HeaderContainer>
      <div style={{ fontSize: "2rem" }}>
        <StyledLink to="/">MatchBox</StyledLink>
      </div>
      {loginState !== null && (
        <HeaderFlex>
          <StyledLink to={"/helpcenter"}>Help Center</StyledLink>
          <StyledLink to={`/camper/${sessionStorage.getItem("camperId")}`}>
            {`Howdy, ${loginState.firstName}`}
          </StyledLink>
          <StyledLink
            to="/"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Sign out
          </StyledLink>
        </HeaderFlex>
      )}
      {loginState === null && (
        <SigninSignup>
          <StyledLink to={"/helpcenter"}>Help Center</StyledLink>
          <StyledLink to="/signin">Sign in</StyledLink>
          <StyledLink to="/signup">Sign up</StyledLink>
        </SigninSignup>
      )}
    </HeaderContainer>
  );
};
// const Header = ({ users }) => {
//   return (
//     <HeaderContainer>
//       <div style={{ fontSize: "2rem" }}>
//         <StyledLink to="/">Facespace</StyledLink>
//       </div>
//       {sessionStorage.getItem("userid") ? (
//         <HeaderFlex>
//           <StyledLink to={`/users/${sessionStorage.getItem("userid")}`}>
//             {`Howdy, ${sessionStorage.getItem("username")}`}
//           </StyledLink>
//           <StyledLink
//             to="/"
//             onClick={() => {
//               sessionStorage.clear();
//               window.location.href = "/";
//             }}
//           >
//             Sign out
//           </StyledLink>
//         </HeaderFlex>
//       ) : (
//         <StyledLink to="/signin">Sign in</StyledLink>
//       )}
//     </HeaderContainer>
//   );
// };

const HeaderContainer = styled.div`
  width: 100%;
  height: var(--header-height);
  background-color: var(--c-dark-gold);
  /* background-color: var(--c-dark-gold); */
  color: white;
  font-family: var(--heading-font-family);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const HeaderFlex = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
`;

const SigninSignup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default Header;
