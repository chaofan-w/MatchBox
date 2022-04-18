import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <StyledH1>404</StyledH1>
      <h1 style={{ color: "var(--c-primary-blue)" }}>PAGE NOT FOUND</h1>
    </Wrapper>
  );
};

const TextFocusIn = keyframes`

  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 320px);
  margin-top: max(120px, 10vh);
`;

const StyledH1 = styled.h1`
  font-size: 16rem;
  color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${TextFocusIn} 2s linear forwards;
`;

export default NotFound;
