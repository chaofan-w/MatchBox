import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoginContext from "../LoginContext";
import { VscMailRead, VscMail } from "react-icons/vsc";

const Inbox = () => {
  const { loginState, setLoginState } = useContext(LoginContext);
  const params = useParams;
  const handleChangeRead = (ev) => {
    console.log(ev.target.parentNode.parentNode);
    const camperId = loginState._id;
    const msgTime = ev.target.parentNode.parentNode.getAttribute("id");
    fetch(`/api/camper/msg/${camperId}/${msgTime}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          fetch(`/api/camper/${camperId}`)
            .then((res) => res.json())
            .then((json) => {
              setLoginState(json.data[0]);
            });
        }
      });
  };

  const sortMsgs = loginState.msg.sort(
    (a, b) => Date.parse(b.msgTime) - Date.parse(a.msgTime)
  );
  // console.log(sortMsgs);

  const sortReadMsgs = sortMsgs.sort((a, b) => a.msgRead - b.msgRead);
  console.log(sortReadMsgs);

  return (
    <>
      {loginState &&
        sortReadMsgs.map((msg) => (
          <MsgWrapper
            key={msg.msgTime}
            className={msg.msgRead ? "isRead" : "unread"}
            id={msg.msgTime}
          >
            <Msgflex>
              <p>{msg.msgTime.slice(0, 10)}</p>
              <p>{msg.msgContent}</p>
            </Msgflex>
            <ChangeReadBtn onClick={handleChangeRead} disabled={msg.msgRead}>
              {msg.msgRead ? <VscMailRead /> : <VscMail />}
            </ChangeReadBtn>
          </MsgWrapper>
        ))}
    </>
  );
};

const MsgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  &.isRead {
    color: red;
  }
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
`;

const Msgflex = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ChangeReadBtn = styled.button`
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  border: none;
  background: transparent;
  color: var(--c-primary-grey);
  cursor: pointer;
`;

export default Inbox;
