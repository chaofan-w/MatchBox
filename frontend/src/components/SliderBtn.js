import React from "react";
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";
import styled from "styled-components";

const SliderBtn = ({ direction, moveSlide }) => {
  console.log(direction, moveSlide);
  return (
    <Slidebutton
      onClick={moveSlide}
      className={direction === "next" ? "next" : "prev"}
    >
      <SlideBtnImg src={direction === "next" ? rightArrow : leftArrow} />
    </Slidebutton>
  );
};

const Slidebutton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--c-primary-yellow);
  border: 1px solid rgba(34, 34, 34, 0.287);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &.prev {
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
  }
  &.next {
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
  }
`;

const SlideBtnImg = styled.img`
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

export default SliderBtn;
