import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { keyframes } from "styled-components";
import Notification from "./Notification";
import {
  StyledBtn,
  StyledSelect,
  StyledInput,
  StyledForm,
  SignInContainer,
} from "./SigninPage";

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

export default SignUp;
