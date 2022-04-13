import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";

const Header = () => {
  const { loginState, setLoginState } = useContext(LoginContext);
  console.log(loginState);
  return (
    <HeaderContainer>
      <div>
        <StyledLink to="/">
          <Logo
            src="/images/matchbox-logo-white.png"
            style={{ height: "40px" }}
          />
        </StyledLink>
      </div>
      {loginState !== null && (
        <HeaderFlex>
          <StyledLink className="textlink" to={"/helpcenter"}>
            Help Center
          </StyledLink>
          <StyledLink
            className="textlink"
            to={`/camper/${sessionStorage.getItem("camperId")}`}
          >
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
          <StyledLink className="textlink" to={"/helpcenter"}>
            Help Center
          </StyledLink>
          <StyledLink className="textlink" to="/signin">
            Sign in
          </StyledLink>
          <StyledLink className="textlink" to="/signup">
            Sign up
          </StyledLink>
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
  height: 70px;
  background-color: var(--c-primary-blue);
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
  align-items: center;
  height: 100%;
`;

const SigninSignup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 120px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  &.textlink {
    justify-content: center;
    &:hover {
      background-color: var(--c-primary-green);
    }
  }
`;

const Logo = styled.img`
  display: block;
`;

export default Header;
