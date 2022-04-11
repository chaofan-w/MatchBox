import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { useHistory } from "react-router-dom";
import Notification from "./Notification";

const HelpTaskOfCamperCard = ({ task, setTasksOfCamper }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const { loginState, setHelpTasks } = useContext(LoginContext);
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
          <StyledButton id={task._id} onClick={handleBecomeHelper}>
            Join Helper Team
          </StyledButton>
        )}
      {loginState === null && task.status === "recruit" && (
        <StyledButton
          id={task._id}
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
          <StyledButton id={task._id} onClick={handleSignOffTask}>
            sign off task
          </StyledButton>
        )}
      {loginState !== null &&
        task.taskOwner === loginState._id &&
        task.status === "in-progress" && (
          <>
            <StyledButton id={task._id} onClick={handleTaskCompleted}>
              Mark Task Completed
            </StyledButton>
            <StyledButton id={task._id} onClick={handleCancelTask}>
              Cancel Task
            </StyledButton>
          </>
        )}
      {loginState !== null &&
        task.taskOwner === loginState._id &&
        task.status === "recruit" && (
          <>
            <StyledButton id={task._id} onClick={handleCancelTask}>
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
  width: 200px;
  height: 200px;
  padding: 5px;
  border: 2px solid var(--c-superlight);
  background: rgba(205, 217, 255, 0.74);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(205, 217, 255, 0.3);
  justify-content: space-between;
`;
const StyledButton = styled.button`
  display: block;
  width: 180px;
  height: 30px;
  font-size: 20px;
  background: var(--c-dark-gold);
  outline: none;
  border: none;
  color: var(--c-white);
  border-radius: 5px;
  cursor: pointer;
`;

export default HelpTaskOfCamperCard;
