import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { keyframes } from "styled-components";
import Notification from "./Notification";

const SignIn = () => {
  const history = useHistory();
  const { loginState, setLoginState } = useContext(LoginContext);
  const [showNotification, setShowNotification] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [campNums, setCampNums] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/camper/campkeys/campNum")
      .then((res) => res.json())
      .then((json) => {
        setCampNums(json.data);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // console.log(ev.target.campNum.value);
    const lastName = ev.target.lastName.value;
    const campNum = ev.target.campNum.value;
    const shelterNum = ev.target.shelterNum.value;
    const checkSignin = await fetch(
      `/api/camper?lastname=${lastName}&campnum=${campNum}&shelternum=${shelterNum}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setLoginState(json.data[0]);
          sessionStorage.setItem("camperId", json.data[0]._id);
          history.push(`/camper/${json.data[0]._id}`);
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
        {/* <div>SignIn Page</div> */}
        <StyledForm onSubmit={handleSubmit}>
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

          <StyledBtn type="submit" disabled={disabledInput}>
            Sign In
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

export const SignInContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 2px solid darkgreen; */
  /* padding: 150px; */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 400px;
  height: fit-content;
  background: var(--c-primary-blue);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.2px);
  -webkit-backdrop-filter: blur(10.2px);
  border: 1px solid var(--c-primary-grey);
`;

export const StyledInput = styled.input`
  font-size: 2rem;
  width: 40vw;
  max-width: 400px;
  margin: 1vw auto 20px;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: rgba(var(--c-light-background-rgb), 0.5);
  outline: none;
  border: 3px solid var(--fontcolor-white);
  border-radius: 10px;
  color: var(--fontcolor-white);
  &::-webkit-input-placeholder {
    color: var(--fontcolor-primary);
  }
  &:focus {
    background: rgba(var(--c-secondary-green-rgb), 0.9);
    color: var(--c-black);
    &::-webkit-input-placeholder {
      opacity: 0.2;
    }
  }
`;

export const StyledSelect = styled.select`
  font-size: 1.2rem;
  width: 40vw;
  max-width: 400px;
  margin: 1vw auto 20px;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: rgba(var(--c-light-background-rgb), 0.5);
  outline: none;
  border: 3px solid var(--fontcolor-white);
  border-radius: 10px;
  color: var(--fontcolor-white);
  &::-webkit-input-placeholder {
    color: var(--fontcolor-primary);
  }
  &:focus {
    background: rgba(var(--c-secondary-green-rgb), 0.9);
    color: var(--c-black);
    &::-webkit-input-placeholder {
      opacity: 0.2;
    }
  }
`;

export const StyledBtn = styled.button`
  width: 25vw;
  max-width: 250px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1rem 1rem;
  background: var(--c-primary-yellow);
  outline: none;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  color: var(--c-primary-blue);
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: var(--c-secondary-yellow);
  }
`;

export default SignIn;
