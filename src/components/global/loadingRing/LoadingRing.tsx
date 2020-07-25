import React from "react";
import styled, { keyframes } from "styled-components";

type Props = { length: number };

export default class extends React.Component<Props, {}> {
  static defaultProps = {
    length: 150,
  };

  render = () => (
    <RingWrapper length={this.props.length}>
      <div />
      <div />
      <div />
      <div />
    </RingWrapper>
  );
}

export const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const selectLength = (props: Props): number => props.length;

const RingWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${selectLength}px;
  height: ${selectLength}px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${selectLength}px;
    height: ${selectLength}px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  div: nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
