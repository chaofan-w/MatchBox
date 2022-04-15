import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { FiMail } from "react-icons/fi";

const Header = () => {
  const { loginState, setLoginState, showInBox, setShowInBox } =
    useContext(LoginContext);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  useEffect(() => {
    if (loginState) {
      const unreadmsgs = loginState.msg.filter((msg) => msg.msgRead === false);
      setUnreadMsgCount(unreadmsgs.length);
    } else {
      return;
    }
  }, [loginState]);

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
          <StyledLink
            className="textlink"
            to={"/helpcenter"}
            onClick={() => {
              setShowInBox(false);
            }}
          >
            Help Center
          </StyledLink>
          <StyledLink className="textlink" to={"/msgcenter"}>
            VO Messages
          </StyledLink>
          <StyledLink
            className="textlink"
            to={`/camper/${sessionStorage.getItem("camperId")}`}
            onClick={() => {
              setShowInBox(false);
            }}
          >
            {`Howdy, ${loginState.firstName}`}
          </StyledLink>
          <InBoxBtn
            onClick={() => {
              setShowInBox(!showInBox);
            }}
          >
            <FiMail />
            {unreadMsgCount > 0 && <MsgCount>{unreadMsgCount}</MsgCount>}
          </InBoxBtn>

          <StyledLink
            to="/"
            className="textlink"
            onClick={() => {
              setShowInBox(false);
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
          <StyledLink className="textlink" to={"/msgcenter"}>
            VO Messages
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

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: max(70px, auto);
  background-color: var(--c-primary-blue);
  color: white;
  font-family: var(--heading-font-family);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 10px;
  z-index: 5;
`;

const HeaderFlex = styled.div`
  width: max(400px, 60%);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: max(10px, 4vw);
  align-items: center;
  height: 100%;
  border: 1px solid black;
`;

const SigninSignup = styled.div`
  width: max(360px, 60%);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: max(10px, 4vw);
  align-items: center;
  height: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: max(100px, auto);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: max(15px, 1vw);
  text-align: center;
  &.textlink {
    justify-content: center;
    &:hover {
      background-color: var(--c-primary-green);
    }
  }
`;

const InBoxBtn = styled.button`
  position: relative;
  width: max(20px, 1vw);
  height: max(20px, 1vw);
  font-size: max(20px, 1vw);
  padding: 0;
  cursor: pointer;
  &.textlink {
    justify-content: center;
    &:hover {
      background-color: var(--c-primary-green);
    }
  }
  background: transparent;
  border: none;
`;

const MsgCount = styled.div`
  width: max(10px, 0.5vw);
  height: max(10px, 0.5vw);
  border-radius: 50%;
  font-size: max(8px, 0.4vw);
  line-height: max(10px, 0.5vw);
  background: var(--c-error);
  position: absolute;
  top: -2px;
  right: -3px;
`;

const Logo = styled.img`
  display: block;
`;

export default Header;
