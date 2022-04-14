import React, { useState, useEffect, useRef } from "react";
import SliderBtn from "./SliderBtn";
import styled from "styled-components";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const timeoutRef = useRef(null);
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const skills = [
    "IT support",
    "child care",
    "electrial technique",
    "first aid and treatment",
    "food preparation",
    "laundry",
    "plumbing and repair",
    "search and rescue",
    "senior care",
    "shelter building",
    "shelter hygiene",
    "supply logistics",
  ];
  const imgPaths = skills.map(
    (skill) => `/images/${skill.split(" ").join("-")}.png`
  );
  // console.log(imgPaths);

  //-----------------auto slider setting, delay 4000ms----------------
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setSlideIndex((prevIndex) =>
          prevIndex === imgPaths.length ? 1 : prevIndex + 1
        ),
      4000
    );
    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  const nextSlide = () => {
    if (slideIndex < imgPaths.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imgPaths.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex > 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(imgPaths.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <Slidecontainer className="slide-Container">
      {imgPaths.map((img, index) => (
        <Slide
          key={`${img.split("/")[2].slice(0, -4)}-${index}`}
          className={slideIndex === index + 1 ? "active-anim" : "slide"}
        >
          <Slideimg src={imgPaths[index]} alt={skills[index]} />
          <SlideTitle>Our People: {skills[index]}</SlideTitle>
        </Slide>
      ))}
      <SliderBtn moveSlide={nextSlide} direction={"next"} />
      <SliderBtn moveSlide={prevSlide} direction={"prev"} />

      <DotContainer className="container-dots">
        {Array.from({ length: 12 }).map((item, index) => (
          <Dot
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "active" : "dot"}
          ></Dot>
        ))}
      </DotContainer>
    </Slidecontainer>
  );
};

const Slidecontainer = styled.div`
  width: 650px;
  min-width: 320px;
  height: 440px;
  /* min-height: 360px; */
  margin: 10px auto 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 700px) {
    margin: 50px 10px 0;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  /* opacity: 0; */
  &.active-anim {
    opacity: 1;
    transition: opacity ease-in-out 0.4s;
  }
  &.slide {
    opacity: 0;
    transition: opacity ease-in-out 0.4s;
  }
`;

const Slideimg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(50%);
  /* filter: grayscale(60%); */
`;
const SlideTitle = styled.div`
  display: block;
  font-size: 30px;
  padding: 5px 20px;
  width: 100%;
  font-family: "Poppins", sans-serif;
  color: var(--c-primary-blue);
  background: rgba(236, 208, 111, 0.55);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(236, 208, 111, 0.33);
  position: absolute;
  top: 10%;
  left: 10%;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Dot = styled.div`
  width: min(2vw, 15px);
  height: min(2vw, 15px);
  border-radius: 50%;
  /* border: 3px solid #f1f1f1; */
  margin: 0 5px;
  background: var(--c-primary-grey);
  &.active {
    background: var(--c-primary-blue);
  }
`;

export default Slider;
