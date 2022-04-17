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

  // const sortReadMsgs = sortMsgs.sort((a, b) => a.msgRead - b.msgRead);
  // console.log(sortReadMsgs);

  return (
    <>
      {loginState &&
        sortMsgs.map((msg) => (
          <MsgWrapper
            key={msg.msgTime}
            className={msg.msgRead ? "isRead" : "unread"}
            id={msg.msgTime}
          >
            <Msgflex>
              <p
                style={{ fontFamily: "'Roboto Condensed'", fontWeight: "500" }}
              >
                {msg.msgTime.slice(0, 10)}
              </p>
              <p
                style={{
                  fontFamily: "'Roboto'",
                  fontSize: "13px",
                  lineHeight: "1.2",
                }}
              >
                {msg.msgContent}
              </p>
            </Msgflex>
            <ChangeReadBtn
              className="readingBtn"
              onClick={handleChangeRead}
              disabled={msg.msgRead}
            >
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
  background: rgba(var(--c-secondary-green-rgb), 0.2);
  &.isRead {
    color: var(--fontcolor-primary);
    background: rgba(var(--fontcolor-white-rgb), 0.2);
    .readingBtn {
      cursor: none;
    }
  }
  height: 80px;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    transform: scale(1.05);
    background: rgba(var(--c-primary-green-rgb), 0.9);
    color: var(--fontcolor-white);
    .readingBtn {
      color: var(--c-primary-yellow);
    }
  }
`;

const Msgflex = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  font-size: 15px;
  gap: 8px;
`;

const ChangeReadBtn = styled.button`
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  border: none;
  background: transparent;
  color: var(--c-primary-blue);
  cursor: pointer;
`;

export default Inbox;
