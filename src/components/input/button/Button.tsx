import React from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";

export default (props: {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      style={{
        fontSize: "14px",
        padding: "10px 16px",
        width: "auto",
        height: "auto",
        borderRadius: "5px",
      }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

const Button = styled(ButtonBase)`
  background: rgba(0, 0, 0, 0);
  transition: all 0.1s ease;
  text-align: center;
  white-space: nowrap;
  touch-action: manipulation;
  line-height: 1.3333333;

  :focus {
    outline: none;
  }
`;
