import React, { useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { FiXCircle } from "react-icons/fi";

const Notification = ({ setDisabledInput, message, setShowNotification }) => {
  return (
    <StyledNotification>
      <div>{message}</div>
      <Closebutton
        style={{
          border: "none",
          width: "35px",
          height: "35px",
          background: "none",
          color: "var(--fontcolor-white)",
          fontSize: "30px",
        }}
        onClick={() => {
          setShowNotification(false);
          setDisabledInput(false);
        }}
      >
        <FiXCircle />
      </Closebutton>
    </StyledNotification>
  );
};

const StyledNotification = styled.div`
  display: flex;
  position: relative;
  width: 500px;
  height: 300px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  /* background-color: rgba(var(--c-error-rgb), 0.9); */
  background: rgba(249, 64, 56, 0.55);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.3px);
  -webkit-backdrop-filter: blur(5.3px);
  border: 1px solid rgba(249, 64, 56, 1);
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  line-height: 1.5;
  transition: 0.5s;
  cursor: pointer;
  z-index: 5;
`;

const Closebutton = styled.button`
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export default Notification;
