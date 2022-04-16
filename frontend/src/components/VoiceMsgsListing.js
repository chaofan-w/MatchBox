import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginContext from "../LoginContext";
import VoMsgCard from "./VoMsgCard";

const VoiceMesgsListing = () => {
  const [voiceMsgs, setVoiceMsgs] = useState(null);

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

export default VoiceMesgsListing;
