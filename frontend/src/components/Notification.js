import React, { useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";

const Notification = ({ setDisabledInput, message, setShowNotification }) => {
  return (
    <StyledNotification>
      <div>{message}</div>
      <button
        style={{
          border: "none",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          background: "none",
          border: "2px solid var(--c-superlight)",
          color: "var(--c-superlight)",
          fontWeight: "400",
          fontSize: "20px",
        }}
        onClick={() => {
          setShowNotification(false);
          setDisabledInput(false);
        }}
      >
        X
      </button>
    </StyledNotification>
  );
};

const StyledNotification = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 70%);
  padding: 5px;
  background-color: rgba(var(--c-error-rgb), 0.9);
  color: white;
  font-family: "Segoe UI", sans-serif;
  transition: 0.5s;
  border-radius: 8px;
  cursor: pointer;
`;

export default Notification;
