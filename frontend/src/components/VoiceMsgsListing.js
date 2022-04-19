import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginContext from "../LoginContext";
import VoMsgCard from "./VoMsgCard";
import VoMsgForm from "./VoMsgForm";

const VoiceMesgsListing = () => {
  const [voiceMsgs, setVoiceMsgs] = useState(null);
  const { loginState } = useContext(LoginContext);

  useEffect(() => {
    fetch("/api/vomsgs/get-all")
      .then((res) => res.json())
      .then((json) => {
        setVoiceMsgs(json.data);
      });
  }, [setVoiceMsgs]);
  console.log(voiceMsgs);

  return (
    <>
      <TaskListingWrapper>
        {voiceMsgs &&
          voiceMsgs.map((msg, index) => (
            <VoMsgCard key={msg._id} msg={msg} index={index} />
          ))}
        {loginState && (
          <LeaveMsg>
            <VoMsgForm voiceMsgs={voiceMsgs} setVoiceMsgs={setVoiceMsgs} />
          </LeaveMsg>
        )}
      </TaskListingWrapper>
    </>
  );
};

const TaskListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 150px 30px;
  gap: 30px;
  .recruit {
    background: var(--c-primary-purple);
    color: var(--fontcolor-white);
  }
  .in-progress {
    background: var(--c-primary-green);
    color: var(--fontcolor-white);
  }
  .Completed {
    background: var(--c-primary-grey);
    color: var(--c-black);
  }
`;
const LeaveMsg = styled.div`
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
`;

export default VoiceMesgsListing;
