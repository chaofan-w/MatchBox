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
  // console.log(helpTasks);

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

export default HelpTaskListing;
