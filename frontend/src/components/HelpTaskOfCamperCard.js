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
            setMessage(json.message);
            setShowNotification(true);
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
            setMessage(json.message);
            setShowNotification(true);
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
              });
            fetch("/api/helptasks")
              .then((res) => res.json())
              .then((json) => {
                setHelpTasks(json.data);
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
            setMessage(json.message);
            setShowNotification(true);
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
            fetch("/api/helptasks")
              .then((res) => res.json())
              .then((json) => {
                setHelpTasks(json.data);
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
            setMessage(json.message);
            setShowNotification(true);
            fetch(`/api/helptasks/${camperId}`)
              .then((res) => res.json())
              .then((json) => {
                setTasksOfCamper(json.data);
              });
            fetch("/api/helptasks")
              .then((res) => res.json())
              .then((json) => {
                setHelpTasks(json.data);
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
    <>
      <Wrapper className={task.status}>
        <Row1>
          <TitleBlock>
            <Titlespan>Task Id:</Titlespan>
            <IdSpan>{task._id}</IdSpan>
          </TitleBlock>
        </Row1>
        <Row2>
          <Col1>
            <SkillImg
              src={`/images/${task.taskSkill.split(" ").join("-")}.png`}
              alt={task.taskSkill}
            />
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
            <SkillSpan>{task.taskSkill}</SkillSpan>
          </SkillBlock>
        </Row3>
        <Row4>
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
                  Completed
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
        </Row4>
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
  gap: 5px;
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
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(20%);
    transform: scale(1.1);
    transition: 500ms linear;
  }
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
  border-top: 2px solid rgba(var(--c-secondary-grey-rgb), 0.5);
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

export default HelpTaskOfCamperCard;
