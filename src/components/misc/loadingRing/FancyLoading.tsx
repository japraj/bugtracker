import React from "react";
import { spin } from "./LoadingRing";
import styled from "styled-components";

export default () => (
  <FancyRingWrapper>
    <div />
  </FancyRingWrapper>
);

const FancyRingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backface-visibility: hidden;

  > div {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #e85656;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    animation: ${spin} 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */

    :before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #209e91;
      -webkit-animation: ${spin} 3s linear infinite;
      animation: ${spin} 3s linear infinite;
    }

    :after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #dfb81c;
      animation: ${spin} 1.5s linear infinite;
    }
  }
`;
