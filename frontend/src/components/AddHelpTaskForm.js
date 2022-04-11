import React from "react";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import Notification from "./Notification";

const AddHelpTaskForm = ({ setShowForm, setTasksOfCamper }) => {
  const { loginState, setLoginState } = useContext(LoginContext);
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

          <StyledBtn type="submit" disabled={disabledInput}>
            Create New Task
          </StyledBtn>
          <Closebutton onClick={() => setShowForm(false)}>X</Closebutton>
        </StyledForm>
        <div>
          {showNotification && (
            <Notification
              setShowNotification={setShowNotification}
              setDisabledInput={setDisabledInput}
              message={message}
            />
          )}
        </div>
      </SignInContainer>
    </>
  );
};

const SignInContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid darkgreen;

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const StyledForm = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  min-width: 400px;
  height: fit-content;
  background: var(--c-grey-blue);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.2px);
  -webkit-backdrop-filter: blur(10.2px);
  border: 1px solid var(--c-superlight);
`;

const StyledInput = styled.input`
  font-size: 2rem;
  width: 40vw;
  max-width: 400px;
  margin: 1vw auto 20px;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: rgba(var(--c-black), 0.5);
  outline: none;
  border: 3px solid var(--c-white);
  border-radius: 10px;
  color: var(--c-superlight);
  &::-webkit-input-placeholder {
    color: var(--c-superlight);
  }
  &:focus {
    background: rgba(var(--c-tint-blue-rgb), 0.9);
    color: var(--c-black);
    &::-webkit-input-placeholder {
      opacity: 0.2;
    }
  }
`;

const StyledSelect = styled.select`
  font-size: 1.2rem;
  width: 40vw;
  max-width: 400px;
  margin: 1vw auto 20px;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: rgba(var(--c-black), 0.5);
  outline: none;
  border: 3px solid var(--c-white);
  border-radius: 10px;
  color: var(--c-superlight);
  &::-webkit-input-placeholder {
    color: var(--c-grey-text);
  }
  &:focus {
    background: rgba(var(--c-tint-blue-rgb), 0.9);
    color: var(--c-black);
    &::-webkit-input-placeholder {
      opacity: 0.2;
    }
  }
`;

const StyledBtn = styled.button`
  width: 25vw;
  max-width: 250px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: var(--c-dark-gold);
  outline: none;
  border: none;
  border-radius: 10px;
  color: var(--c-white);
  font-size: 1.5rem;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background: var(--c-tint-blue);
    color: var(--c-black);
  }
`;

const Closebutton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  border: none;
  background-color: transparent;
  color: var(--c-dark-gold);
  cursor: pointer;
`;

export default AddHelpTaskForm;
