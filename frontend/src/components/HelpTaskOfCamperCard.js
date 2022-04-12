import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { useHistory } from "react-router-dom";
import Notification from "./Notification";

const HelpTaskOfCamperCard = ({ task, setTasksOfCamper }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { loginState, setLoginState, setHelpTasks } = useContext(LoginContext);
  const camperId = loginState._id;

  const handleBecomeHelper = async (ev) => {
    const taskId = ev.target.id;
    const helperId = loginState._id;
    try {
      const becomehelper = await fetch("/api/helptasks/add-helper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          helperId: helperId,
          taskId: taskId,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
              });
          } else {
            setMessage(json.message);
            setShowNotification(true);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignOffTask = async (ev) => {
    const taskId = ev.target.id;
    const helperId = loginState._id;
    try {
      const deletehelper = await fetch("/api/helptasks/delete-helper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          helperId: helperId,
          taskId: taskId,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
              });
          } else {
            setMessage(json.message);
            setShowNotification(true);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancelTask = async (ev) => {
    const taskId = ev.target.id;
    try {
      const cancelTask = await fetch("/api/delete-helptask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
                fetch(`/api/camper/${camperId}`)
                  .then((res) => res.json())
                  .then((json) => {
                    setLoginState(json.data[0]);
                  });
              });
          } else {
            setMessage(json.message);
            setShowNotification(true);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleTaskCompleted = async (ev) => {
    const taskId = ev.target.id;
    try {
      const completeTask = await fetch("/api/helptasks/taskdone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
              });
          } else {
            setMessage(json.message);
            setShowNotification(true);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Wrapper className={task.status}>
      <div>
        <div>Task Id: {task._id}</div>
        <div>Skill: {task.taskSkill}</div>
        <div>Number of Helpers: {task.helperNum - task.taskHelpers.length}</div>
        <div>Location: {task.location}</div>
        <div>Status: {task.status}</div>
      </div>
      {loginState !== null &&
        task.status === "recruit" &&
        task.taskHelpers.indexOf(loginState._id) < 0 &&
        task.taskOwner !== loginState._id && (
          <StyledButton
            id={task._id}
            className={task.status}
            onClick={handleBecomeHelper}
          >
            Join Helper Team
          </StyledButton>
        )}
      {loginState === null && task.status === "recruit" && (
        <StyledButton
          id={task._id}
          className={task.status}
          onClick={() => {
            history.push("/signin");
          }}
        >
          sign in to add task
        </StyledButton>
      )}
      {loginState !== null &&
        task.taskHelpers.indexOf(loginState._id) >= 0 &&
        task.status !== "Completed" && (
          <StyledButton
            id={task._id}
            className={task.status}
            onClick={handleSignOffTask}
          >
            sign off task
          </StyledButton>
        )}
      {loginState !== null &&
        task.taskOwner === loginState._id &&
        task.status === "in-progress" && (
          <>
            <StyledButton
              id={task._id}
              className={task.status}
              onClick={handleTaskCompleted}
            >
              Mark Task Completed
            </StyledButton>
            <StyledButton
              id={task._id}
              className={task.status}
              onClick={handleCancelTask}
            >
              Cancel Task
            </StyledButton>
          </>
        )}
      {loginState !== null &&
        task.taskOwner === loginState._id &&
        task.status === "recruit" && (
          <>
            <StyledButton
              id={task._id}
              className={task.status}
              onClick={handleCancelTask}
            >
              Cancel Task
            </StyledButton>
          </>
        )}

      {showNotification && (
        <Notification
          message={message}
          setShowNotification={setShowNotification}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 300px;
  height: 300px;
  padding: 5px;
  border: 2px solid var(--c-superlight);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  justify-content: space-between;
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
const StyledButton = styled.button`
  display: block;
  width: 50%;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  background: var(--c-secondary-orange);
  outline: none;
  border: 2px var(--fontcolor-white) solid;
  color: var(--fontcolor-white);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: var(--fontcolor-white);
    color: var(--fontcolor-primary);
  }
  /* &.recruit {
    background: var(--c-secondary-purple);
    color: var(--fontcolor-white);
  }
  &.in-progress {
    background: var(--c-primary-blue);
    color: var(--fontcolor-white);
  }
  &.Completed {
    color: var(--c-black);
  } */
`;

export default HelpTaskOfCamperCard;
