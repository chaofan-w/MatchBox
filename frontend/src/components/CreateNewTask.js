import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import AddHelpTaskForm from "./AddHelpTaskForm";

const CreateNewTask = ({ setTasksOfCamper }) => {
  const { loginState } = useContext(LoginContext);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Wrapper>
        <h1
          style={{
            fontSize: "90px",
            fontWeight: "300",
            color: "var(--c-light-blue)",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowForm(true);
          }}
        >
          +
        </h1>
      </Wrapper>
      {showForm && (
        <FormWrapper>
          <AddHelpTaskForm
            setShowForm={setShowForm}
            setTasksOfCamper={setTasksOfCamper}
          />
        </FormWrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
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
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CreateNewTask;
