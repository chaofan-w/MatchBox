import React from "react";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import Notification from "./Notification";
import {
  StyledBtn,
  StyledSelect,
  StyledInput,
  StyledForm,
  SignInContainer,
} from "./SigninPage";

const AddHelpTaskForm = ({ setShowForm, setTasksOfCamper }) => {
  const { loginState, setLoginState, setHelpTasks, helpTasks } =
    useContext(LoginContext);
  const [showNotification, setShowNotification] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [skills, setSkills] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/camper/campkeys/skills")
      .then((res) => res.json())
      .then((json) => {
        setSkills(json.data);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const ownerId = loginState._id;
    const skills = ev.target.skills.value;
    const helperNum = ev.target.helperNum.value;

    const addNewHelpTask = await fetch("/api/add-newhelptask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ownerId: ownerId,
        skillNeed: skills,
        helperNum: helperNum,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setMessage(json.message);
          setShowNotification(true);
          setShowForm(false);
          fetch(`/api/helptasks/${ownerId}`)
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
          setShowNotification(true);
          setDisabledInput(true);
          setMessage(json.message);
        }
      });
  };

  return (
    <>
      <SignInContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledSelect
            name="helperNum"
            id="helperNum"
            disabled={disabledInput}
          >
            <option value="" selected="selected" disabled>
              Select number of helpers needed:
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={`numofHelpers-${num}`} value={num}>
                {num}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect name="skills" id="skills" disabled={disabledInput}>
            <option value="" selected="selected" disabled>
              Select task type:
            </option>
            {skills &&
              skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
          </StyledSelect>

          <StyledBtn
            type="submit"
            disabled={disabledInput}
            style={{ fontSize: "1.5rem" }}
          >
            Create New Task
          </StyledBtn>
          <Closebutton onClick={() => setShowForm(false)}>X</Closebutton>
        </StyledForm>
      </SignInContainer>
      <div>
        {showNotification && (
          <Notification
            setShowNotification={setShowNotification}
            setDisabledInput={setDisabledInput}
            message={message}
          />
        )}
      </div>
    </>
  );
};

const Closebutton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  border: none;
  background-color: transparent;
  color: var(--c-secondary-grey);
  cursor: pointer;
`;

export default AddHelpTaskForm;
