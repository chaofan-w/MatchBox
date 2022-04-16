import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import LoginContext from "../LoginContext";
import DemoTaskCard from "./DemoTaskCard";
import DemoTaskCard2 from "./DemoTaskCard2";
import DemoTaskCard3 from "./DemoTaskCard3";
import Slider from "./Slider";

const Home = () => {
  const { loginState, helpTasks } = useContext(LoginContext);
  const [demoTask, setDemoTask] = useState(null);
  useEffect(() => {
    fetch("/api/helptasks")
      .then((res) => res.json())
      .then((json) => {
        setDemoTask(json.data[0]);
      });
  }, []);
  // console.log(demoTask);

  return (
    <HomeContainer>
      <HomeWrapper className="scroll-page">
        <TaskListingWrapper>
          {demoTask && <DemoTaskCard key={demoTask._id} task={demoTask} />}
        </TaskListingWrapper>

        <BeliefContainer>
          <Styledh1>Mission</Styledh1>
          <div
            style={{
              borderBottom: "2px solid var(--c-primary-yellow)",
              width: "60%",
              margin: "30px auto",
            }}
          ></div>
          <Styledh3>
            To build a community oriented network for a sustainable and
            responsive community recovery.
          </Styledh3>
        </BeliefContainer>
      </HomeWrapper>
      <SlideSection className="scroll-page">
        <Styledh2>Community</Styledh2>
        <TaskListingWrapper>
          {demoTask && <DemoTaskCard2 key={demoTask._id} task={demoTask} />}
        </TaskListingWrapper>
        <Slider />
      </SlideSection>
      <SlideSection2 className="scroll-page">
        <Styledh2>Innovation</Styledh2>
        <TaskListingWrapper>
          {demoTask && <DemoTaskCard3 key={demoTask._id} task={demoTask} />}
        </TaskListingWrapper>
        <img src="./images/matchbox-device.png" />
      </SlideSection2>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  .scroll-page {
    scroll-behavior: auto;
  }
`;

const Slideleft = keyframes`
0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }`;

const TextFocusIn = keyframes`
0% {
  -webkit-filter: blur(12px);
          filter: blur(12px);
  opacity: 0;
}
100% {
  -webkit-filter: blur(0px);
          filter: blur(0px);
  opacity: 1;
  background: rgba(0, 0, 0, 0.3);
  /* border-radius: 16px; */
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* border: 1px solid rgba(45, 45, 45, 0.33); */
};
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  gap: max(10px, 5vw);
  position: relative;
  width: 100%;
  height: 100vh;
  /* min-height: 90vh; */
  background: url("/images/floodBkg.jpg");
  background-size: cover;
  background-position: center;
  padding-left: 15%;
  padding-right: 15%;

  /* filter: grayscale(80%); */
`;

const TaskListingWrapper = styled.div`
  display: block;
  opacity: 0;

  gap: 20px;
  animation-name: ${Slideleft};
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const BeliefContainer = styled.div`
  display: block;
  min-width: 360px;
  height: 440px;
  opacity: 0;
  animation-name: ${TextFocusIn};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: 2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const Styledh1 = styled.div`
  display: block;
  font-size: max(50px, 5vw);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  /* color: var(--c-primary-darkblue); */
  color: var(--c-primary-yellow);
  text-align: center;
  margin-top: 50px;
`;
const Styledh2 = styled.div`
  display: block;
  font-size: max(30px, 3vw);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  /* color: var(--c-primary-darkblue); */
  color: var(--c-primary-yellow);
  text-align: center;
  margin-top: 50px;
`;
const Styledh3 = styled.div`
  display: block;
  font-size: max(30px, 2.5vw);
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  margin-top: 0px;
  color: var(--c-primary-yellow);
  text-align: center;
  padding: 0px 35px;
  line-height: 1.2;
`;

const SlideSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  gap: max(10px, 5vw);
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 90vh;
  background: url("/images/volunteers-purple.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  padding-left: 15%;
  padding-right: 15%;
`;

const SlideSection2 = styled(SlideSection)`
  background: url("/images/rescue-blue.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  gap: max(10px, 4vw);
`;

export default Home;
