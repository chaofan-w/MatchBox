import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { keyframes } from "styled-components";
import Notification from "./Notification";

const SignUp = () => {
  const history = useHistory();
  const { loginState, setLoginState } = useContext(LoginContext);
  const [showNotification, setShowNotification] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [campNums, setCampNums] = useState(false);
  const [skills, setSkills] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/camper/campkeys/campNum")
      .then((res) => res.json())
      .then((json) => {
        setCampNums(json.data);
      });
    fetch("/api/camper/campkeys/skills")
      .then((res) => res.json())
      .then((json) => {
        setSkills(json.data);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // console.log(ev.target.campNum.value);
    const firstName = ev.target.firstName.value;
    const lastName = ev.target.lastName.value;
    const skills = ev.target.skills.value;
    const campNum = ev.target.campNum.value;
    const shelterNum = ev.target.shelterNum.value;

    const checkSignin = await fetch("/api/add-newcamper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName:
          firstName[0].toUpperCase() + firstName.substring(1).toLowerCase(),
        lastName:
          lastName[0].toUpperCase() + lastName.substring(1).toLowerCase(),
        skills: skills,
        campNum: campNum,
        shelterNum: shelterNum,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setShowNotification(true);
          setMessage(json.message);
          setLoginState(true);
          setTimeout(() => {
            setShowNotification(false);
            history.push("/signin");
          }, 2000);
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
          <StyledInput
            name="firstName"
            type="text"
            disabled={disabledInput}
            placeholder="first name:"
          />
          <StyledInput
            name="lastName"
            type="text"
            disabled={disabledInput}
            placeholder="last name:"
          />
          <StyledSelect name="campNum" id="campNum" disabled={disabledInput}>
            <option value="" selected="selected" disabled>
              Select your camp number:
            </option>
            {campNums &&
              campNums.map((campNum) => (
                <option key={campNum} value={campNum}>
                  {campNum}
                </option>
              ))}
          </StyledSelect>
          <StyledInput
            name="shelterNum"
            type="text"
            disabled={disabledInput}
            placeholder="shelter num:"
          />
          <StyledSelect name="skills" id="skills" disabled={disabledInput}>
            <option value="" selected="selected" disabled>
              Select your skills:
            </option>
            {skills &&
              skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
          </StyledSelect>

          <StyledBtn type="submit" disabled={disabledInput}>
            Sign Up
          </StyledBtn>
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

export default SignUp;
