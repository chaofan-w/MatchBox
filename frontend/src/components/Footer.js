import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialFacebook,
  TiSocialGithub,
} from "react-icons/ti";

const Footer = () => {
  return (
    <Wrap>
      <LogoAndSocial>
        <img
          style={{ width: "max(120px, 15vw)" }}
          src="./images/matchbox-logo-white.png"
        />
        <SocialMediaLink>
          <TiSocialFacebook />
          <Nav
            to={{ pathname: "https://www.linkedin.com/in/chaofanwu/" }}
            target="_blank"
          >
            <TiSocialLinkedin />
          </Nav>
          <TiSocialTwitter />
          <TiSocialYoutube />
          <Nav
            to={{ pathname: "https://github.com/chaofan-w/MatchBox" }}
            target="_blank"
          >
            <TiSocialGithub />
          </Nav>
        </SocialMediaLink>
      </LogoAndSocial>
      <Slogan>We Shine Brightest Together, in the Darkest Moment!</Slogan>
      <Copyright>
        <p>Copyright © 2022 Project MatchBox</p>
        <p>Website by Chaofan Wu Studio</p>
      </Copyright>
      <Lightings>
        <Section id="one">
          <Section id="two">
            <Section id="three">
              <Section id="four">
                <Section id="five"></Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </Lightings>
    </Wrap>
  );
};

const OneBoxShadow = keyframes`
from {
box-shadow: 0 0 250px 20px #473C78;
}
to {box-shadow: 0 0 100px 15px #F72A3B; 
};
`;
const TwoBoxShadow = keyframes`
from {
box-shadow: 0 0 250px 20px #18C499;
}

to { box-shadow: 0 0 100px 15px #D8F05E; 
};
`;
const ThreeBoxShadow = keyframes`
from {
box-shadow: 0 0 250px 20px #FFDD00;
}

to { box-shadow: 0 0 100px 15px #3E33FF 
};
`;
const FourBoxShadow = keyframes`
from {
box-shadow: 0 0 250px 20px #781848;
}

to { box-shadow: 0 0 100px 15px #F2BBE9; 
};
`;
const FiveBoxShadow = keyframes`
from {
box-shadow: 0 0 250px 20px #42F2A1;
}

to { box-shadow: 0 0 100px 15px #F4F6AD; 
};
`;

const Wrap = styled.div`
  position: relative;
  bottom: 0;
  width: auto;
  height: max(250px, 10vh);
  background-color: var(--c-black);
  color: white;
  font-family: var(--heading-font-family);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px;
  z-index: 5;
  overflow: hidden;
  padding: max(20px, 3vw);
`;

const Lightings = styled.div`
  bottom: -60px;
  position: absolute;
  width: 100%;
`;

const Section = styled.div`
  /*border-radius*/
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  height: 20px;
  width: 100%;
  position: relative;
  margin: auto;
  &#one {
    animation: ${OneBoxShadow} 5s ease-in-out infinite alternate;
  }
  &#two {
    animation: ${TwoBoxShadow} 4s ease-in-out infinite alternate;
  }
  &#three {
    animation: ${ThreeBoxShadow} 3s ease-in-out infinite alternate;
  }
  &#four {
    animation: ${FourBoxShadow} 2s ease-in-out infinite alternate;
  }
  &#five {
    animation: ${FiveBoxShadow} 1s ease-in-out infinite alternate;
  }
`;

const LogoAndSocial = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const SocialMediaLink = styled.div`
  display: flex;
  flex-direction: row;
  width: max(120px, 15vw);
  justify-content: space-between;

  font-size: max(20px, 2vw);
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Nav = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: var(--fontcolor-white);
  &:hover {
    transform: scale(1.2);
  }
`;

const TrackingIn = keyframes`
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
`;

const Slogan = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: max(15px, 1.5vw);
  text-align: center;
  animation: ${TrackingIn} 2s linear 1 forwards;
`;

export default Footer;
