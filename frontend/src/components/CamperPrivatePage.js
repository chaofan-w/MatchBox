import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../LoginContext";
import HelpTaskCard from "./HelpTaskCard";
import styled from "styled-components";
import HelpTaskOfCamperCard from "./HelpTaskOfCamperCard";
import CreateNewTask from "./CreateNewTask";
import Inbox from "./Inbox";
import { FiXCircle } from "react-icons/fi";

const CamperPrivatePage = () => {
  const { helpTasks, loginState, showInBox, setShowInBox } =
    useContext(LoginContext);
  const [tasksOfCamper, setTasksOfCamper] = useState(null);

  useEffect(() => {
    fetch(`/api/helptasks/${loginState._id}`)
      .then((res) => res.json())
      .then((json) => {
        setTasksOfCamper(json.data);
      });
  }, [setTasksOfCamper]);
  // console.log(tasksOfCamper);

  return (
    <>
      {loginState && (
        <>
          {showInBox && (
            <InBoxContainer>
              <CloseBtn
                onClick={() => {
                  setShowInBox(false);
                }}
              >
                <FiXCircle />
              </CloseBtn>
              <Inbox />
            </InBoxContainer>
          )}

          <TaskListingWrapper>
            {tasksOfCamper &&
              tasksOfCamper.map((task) => (
                <HelpTaskOfCamperCard
                  key={task._id}
                  task={task}
                  setTasksOfCamper={setTasksOfCamper}
                />
              ))}
            <CreateNewTask setTasksOfCamper={setTasksOfCamper} />
          </TaskListingWrapper>
        </>
      )}
      ;
    </>
  );
};

const TaskListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 120px 30px 50px;
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
  .createTask {
    background: var(--c-primary-yellow);
    color: var(--c-primary-blue);
  }
`;

const InBoxContainer = styled.div`
  display: block;
  width: max(300px, 25vw);
  height: min(80vh, 768px);
  border: 2px solid black;
  position: fixed;
  top: 70px;
  right: 20px;
  padding: 30px 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 5;
  background: rgba(255, 255, 255, 0.44);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.9px);
  -webkit-backdrop-filter: blur(7.9px);
  border: 1px solid rgba(255, 255, 255, 1);
`;

const CloseBtn = styled.button`
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 30px;
  border: none;
  background: transparent;
  color: var(--c-secondary-grey);
  cursor: pointer;
`;

export default CamperPrivatePage;
