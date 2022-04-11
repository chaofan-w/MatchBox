import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginContext from "../LoginContext";
import HelpTaskCard from "./HelpTaskCard";

const HelpTaskListing = () => {
  const { helpTasks, setHelpTasks, loginState } = useContext(LoginContext);

  useEffect(() => {
    fetch("/api/helptasks")
      .then((res) => res.json())
      .then((json) => {
        setHelpTasks(json.data);
      });
  }, [setHelpTasks]);
  console.log(helpTasks);

  return (
    <>
      <TaskListingWrapper>
        {helpTasks &&
          helpTasks.map((task) => <HelpTaskCard key={task._id} task={task} />)}
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

export default HelpTaskListing;
