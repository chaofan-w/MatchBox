import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { useHistory } from "react-router-dom";
import Notification from "./Notification";

const DemoTaskCard2 = ({ task }) => {
  return (
    <Wrapper className={task.status}>
      <Row1>
        <TitleBlock>
          <Titlespan>Task Id:</Titlespan>
          <IdSpan>{task._id}</IdSpan>
        </TitleBlock>
      </Row1>
      <Row2>
        <Col1>
          <SkillImg src={`/images/logo-yellow.png`} alt={task.taskSkill} />
        </Col1>
        <Col2>
          <StatusBlock>
            <Titlespan>Status:</Titlespan>
            <StatusSpan>{task.status}</StatusSpan>
          </StatusBlock>
          <NumBlock>
            <Titlespan>Helpers needed:</Titlespan>
            <NumSpan>{task.helperNum - task.taskHelpers.length}</NumSpan>
          </NumBlock>
          <LocationBlock>
            <Titlespan>Location:</Titlespan>
            <LocationSpan>{task.location}</LocationSpan>
          </LocationBlock>
        </Col2>
      </Row2>
      <Row3>
        <SkillBlock>
          <Titlespan>Task:</Titlespan>
          <SkillSpan>shelter building</SkillSpan>
        </SkillBlock>
      </Row3>
      <Row4>
        <StyledButton id={task._id} className={task.status} disabled>
          Offer Help
        </StyledButton>
      </Row4>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 20px auto;
  min-width: 360px;
  height: 440px;
  padding: 20px;
  border: 5px solid var(--c-primary-yellow);
  /* border: 5px solid rgba(var(--c-light-background-rgb), 1); */
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  color: var(--c-primary-yellow);
  /* color: rgba(var(--c-light-background-rgb), 1); */
  gap: 5px;
`;

const Row1 = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 2px solid var(--c-primary-yellow);
  /* border-bottom: 2px solid rgba(var(--c-secondary-grey-rgb), 1); */
`;
const Row2 = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 10px;
  gap: 25px;
  margin-bottom: 10px;
`;
const Col1 = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 5px;
`;
const Col2 = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: nowrap;
  flex-direction: column;
`;
const SkillImg = styled.img`
  display: block;
  width: 140px;
  height: 180px;
  border-radius: 5px;
  opacity: 0.8;
`;
const SkillBlock = styled.div`
  display: block;
  width: 100%;
  height: auto;
`;
const Row3 = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-top: 20px;
  border-top: 2px solid var(--c-primary-yellow);
  /* border-top: 2px solid rgba(var(--c-secondary-grey-rgb), 1); */
`;
const Row4 = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;
`;

const StyledButton = styled.button`
  display: block;
  width: 50%;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  background: transparent;
  outline: none;
  border: 2px var(--c-primary-yellow) solid;
  /* border: 2px var(--fontcolor-white) solid; */
  color: var(--c-primary-yellow);
  /* color: var(--fontcolor-white); */
  border-radius: 5px;
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
  font-size: 30px;
  text-align: center;
`;
const StatusSpan = styled.span`
  display: block;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 30px;
  text-align: left;
`;
const NumSpan = styled.span`
  display: block;
  font-family: "Poppins", sans-serif;
  font-size: 60px;
  text-align: left;
  font-weight: 700;
`;
const LocationSpan = styled.span`
  display: block;
  margin-top: 5px;
`;
const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
`;
const NumBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 80px;
`;
const LocationBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default DemoTaskCard2;
