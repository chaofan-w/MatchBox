import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { useHistory } from "react-router-dom";
import Notification from "./Notification";

const VoMsgCard = ({ msg }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { loginState, setLoginState, setHelpTasks } = useContext(LoginContext);

  return (
    <>
      <Wrapper>
        <Row1>
          <TitleBlock>
            <Titlespan>Msg Id:</Titlespan>
            <IdSpan>{msg._id}</IdSpan>
          </TitleBlock>
        </Row1>
        <Row2>
          <LocationBlock>
            <Titlespan>Date:</Titlespan>
            <LocationSpan>{msg.timestamp.slice(0, 10)}</LocationSpan>
          </LocationBlock>
        </Row2>
        <Row3>
          <Titlespan>Content:</Titlespan>
          <SkillSpan>{msg.msg}</SkillSpan>
        </Row3>
      </Wrapper>
      {showNotification && (
        <Notification
          message={message}
          setShowNotification={setShowNotification}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 340px;
  height: 420px;
  padding: 20px;
  border: 2px solid var(--c-superlight);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  gap: 10px;

  /* .recruit {
    background: var(--c-secondary-purple);
    color: var(--fontcolor-white);
  }
  .in-progress {
    background: var(--c-primary-blue);
    color: var(--fontcolor-white);
  }
  .Completed {
    color: var(--c-black);
  } */
`;

const Row1 = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 2px solid rgba(var(--c-secondary-grey-rgb), 0.5);
`;
const Row2 = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding-top: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(var(--c-secondary-grey-rgb), 0.5);
`;

const Row3 = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Titlespan = styled.span`
  display: block;
  font-size: 12px;
  font-family: "Roboto Condensed", sans-serif;
  margin-bottom: 5px;
`;

const IdSpan = styled.span`
  display: block;
`;
const SkillSpan = styled.span`
  display: block;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 25px;
  text-align: left;
`;

const LocationSpan = styled.span`
  display: block;
  margin-top: 5px;
`;

const LocationBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default VoMsgCard;
