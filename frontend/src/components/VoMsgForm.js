import React, { useState, useContext } from "react";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import Notification from "./Notification";

const VoMsgForm = ({ setVoiceMsgs, voiceMsgs }) => {
  const [post, setPost] = useState("");
  const [invalid, setInvalid] = useState(false);
  const { loginState } = useContext(LoginContext);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnChange = (ev) => {
    if (ev.target.value.length <= 150) {
      setInvalid(false);
      setPost(ev.target.value);
    } else {
      setInvalid(true);
      setPost(ev.target.value);
    }
  };
  console.log(post);
  console.log(loginState._id);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (loginState) {
      const campId = loginState["_id"];
      const campNum = loginState["campNum"];
      const shelterNum = loginState["shelterNum"];
      await fetch("/api/vomsgs/add-inputmsg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campId: campId,
          campNum: campNum,
          shelterNum: shelterNum,
          msg: post,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            setShowNotification(true);
            setMessage(json.message);
            fetch("/api/vomsgs/get-all")
              .then((res) => res.json())
              .then((json) => {
                setVoiceMsgs(json.data);
              });
          }
        });
      setPost("");
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit} id="postMsg">
        <StyledTextArea
          type="text"
          value={post}
          onChange={handleOnChange}
          placeholder="Leave Your message to someone who may be looking for you."
          withinlimit={invalid}
        />
        <TextInfo>
          <TextCount post={post.length}>{150 - post.length}</TextCount>
          <SubmitBtn type="submit" disabled={invalid}>
            Submit
          </SubmitBtn>
        </TextInfo>
      </StyledForm>
      <div>
        {showNotification && (
          <Notification
            setShowNotification={setShowNotification}
            message={message}
          />
        )}
      </div>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 200px;
  max-width: 768px;
  font-family: sans-serif;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding-bottom: 5px;
  padding-top: 5px;
  position: relative;
  font-size: 20px;
  color: #888888;
  outline: none;
  border-radius: 5px;
  border: none;
  resize: none;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;
`;

const TextCount = styled.div`
  font-family: "Segoe UI";
  font-weight: 600;
  font-size: 1rem;
  ${(props) => {
    if (props.post <= 225) {
      return `color:#888888;`;
    } else if (props.post <= 280 && props.post > 225) {
      return `color:#F0D70C;`;
    } else {
      return `color:red;`;
    }
  }}
`;

export const SubmitBtn = styled.button`
  display: inline-block;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color: #ffffff;
  ${(props) =>
    !props.disabled
      ? `background: var(--c-primary-blue); cursor:pointer;`
      : `background:var(--fontcolor-primary); cursor:none;`};
  text-align: center;
  transition: all 0.2s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  &:hover {
    ${(props) =>
      !props.disabled && `background-color: hsl(258deg, 100%, 50%);`};
  }
`;

export default VoMsgForm;
