import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../LoginContext";
import HelpTaskCard from "./HelpTaskCard";
import styled from "styled-components";
import HelpTaskOfCamperCard from "./HelpTaskOfCamperCard";
import CreateNewTask from "./CreateNewTask";

const CamperPrivatePage = () => {
  const { helpTasks, loginState } = useContext(LoginContext);
  const [tasksOfCamper, setTasksOfCamper] = useState(null);

  useEffect(() => {
    fetch(`/api/helptasks/${loginState._id}`)
      .then((res) => res.json())
      .then((json) => {
        setTasksOfCamper(json.data);
      });
  }, [setTasksOfCamper]);
  console.log(tasksOfCamper);

  return (
    <>
      {loginState && (
        <div>
          <div>
            <h3>first name: {loginState.firstName}</h3>
            <h3>last name: {loginState.lastName}</h3>
            <h3>camp No.: {loginState.campNum}</h3>
            <h3>shelter No.: {loginState.shelterNum}</h3>
            <h3>skills : {loginState.skills}</h3>
          </div>
          <div>
            {loginState.msg.map((msg) => (
              <>
                <p>{Date(msg.msgTime)}:</p>
                <p>{msg.msgContent}</p>
                <p>{msg.msgRead}</p>
              </>
            ))}
          </div>
        </div>
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
  );
};

const TaskListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export default CamperPrivatePage;
