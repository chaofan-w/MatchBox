import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginContext from "../LoginContext";
import HelpTaskCard from "./HelpTaskCard";
import { FcPrevious, FcNext } from "react-icons/fc";

const HelpTaskListing = () => {
  const { helpTasks, setHelpTasks, loginState } = useContext(LoginContext);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPage, setShowPage] = useState(null);

  const limit = 8;
  useEffect(() => {
    fetch("/api/helptasks")
      .then((res) => res.json())
      .then((json) => {
        setHelpTasks(json.data);
        setTotalPage(helpTasks && Math.ceil(helpTasks.length / limit));
        setCurrentPage(1);
        fetch(`/api/helptasks/pagination/${currentPage}/${limit}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.status === 200 && helpTasks) {
              console.log(json.data);
              setShowPage(json.data);
            } else {
              console.log(json.message);
            }
          });
      });
    // setShowPage(helpTasks.slice(0, limit));
  }, [setHelpTasks]);
  console.log(showPage);
  console.log(totalPage);

  const handleSwitchPage = async (ev) => {
    setCurrentPage(parseInt(ev.target.value));
    await fetch(`/api/helptasks/pagination/${ev.target.value}/${limit}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200 && helpTasks) {
          console.log(json.data);
          setShowPage(json.data);
        } else {
          console.log(json.message);
        }
      });
  };
  const toNextPage = async (ev) => {
    await fetch(`/api/helptasks/pagination/${currentPage + 1}/${limit}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200 && helpTasks) {
          console.log(json.data);
          setShowPage(json.data);
        } else {
          console.log(json.message);
        }
      });
    setCurrentPage(currentPage === totalPage ? currentPage : currentPage + 1);
  };
  const toPrevPage = async (ev) => {
    await fetch(`/api/helptasks/pagination/${currentPage - 1}/${limit}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200 && helpTasks) {
          console.log(json.data);
          setShowPage(json.data);
        } else {
          console.log(json.message);
        }
      });
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
  };
  console.log(currentPage);

  return (
    <>
      <TaskListingWrapper>
        {showPage &&
          showPage.map((task) => <HelpTaskCard key={task._id} task={task} />)}
      </TaskListingWrapper>
      <PaginationContainer>
        <PageBtn
          onClick={toPrevPage}
          disabled={currentPage === 1 ? true : false}
        >
          <FcPrevious />
        </PageBtn>
        {totalPage &&
          Array.from({ length: totalPage }).map((num, index) => (
            <PageBtn
              key={`page-${index}`}
              onClick={handleSwitchPage}
              value={index + 1}
              className={currentPage === parseInt(index + 1) ? "active" : ""}
            >
              {index + 1}
            </PageBtn>
          ))}
        <PageBtn
          onClick={toNextPage}
          disabled={currentPage === totalPage ? true : false}
        >
          <FcNext />
        </PageBtn>
      </PaginationContainer>
      {/* <TaskListingWrapper>
        {helpTasks &&
          helpTasks.map((task) => <HelpTaskCard key={task._id} task={task} />)}
      </TaskListingWrapper> */}
    </>
  );
};

const TaskListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 120px 30px 50px;
  gap: 30px;
  .recruit {
    background: var(--c-primary-purple);
    color: var(--fontcolor-white);
  }
  .in-progress {
    background: var(--c-primary-green);
    color: var(--fontcolor-white);
  }
  .Completed {
    background: var(--c-primary-grey);
    color: var(--c-black);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  margin: 0 auto 50px auto;
  width: auto;
  z-index: 10;
`;

const PageBtn = styled.button`
  width: min(2vw, 20px);
  height: min(2vw, 20px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--c-primary-blue);
  /* border: 3px solid #f1f1f1; */
  margin: 0 5px;
  border: none;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &.active {
    background: var(--c-primary-blue);
    color: var(--fontcolor-white);
  }
`;

export default HelpTaskListing;
