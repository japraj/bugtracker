import React from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";

const Button = styled.button`
  background: rgba(0, 0, 0, 0);
  border-color: var(--highlight);
  border-radius: 5px;
  transition: all 0.1s ease;
  padding: 10px 16px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  display: inline-block;
  line-height: 1.3333333;
  margin: 0;
  height: auto;
  width: auto;

  :focus {
    outline: none;
  }
`;

export default (props: {
  baseClassName: string;
  buttonClassName: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    // ButtonBase from MaterialUI gives the ripple effect
    <ButtonBase className={props.baseClassName}>
      <Button className={props.buttonClassName} onClick={props.onClick}>
        {props.children}
      </Button>
    </ButtonBase>
  );
};
