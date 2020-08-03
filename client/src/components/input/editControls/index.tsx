import React from "react";
import styled from "styled-components";
import Button from "../button";

interface Props {
  showCancel: boolean;
  cancelCallback: () => void;
  submitCallback: () => void;
  submitText: string;
  className: string;
}

export default (props: Props) => {
  return (
    <ControlsWrapper className={props.className}>
      <Cancel
        display={props.showCancel}
        className=""
        onClick={props.cancelCallback}
      >
        Cancel
      </Cancel>
      <Submit className="hoverfx" onClick={props.submitCallback}>
        {props.submitText}
      </Submit>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1rem;

  button {
    color: var(--text-color);
  }
`;

const Cancel = styled(Button)`
  ${(props: { display: boolean }) =>
    props.display ? "" : "display: none !important;"}
  margin-right: 1rem;
`;

const Submit = styled(Button)`
  border: 2px solid rgba(255, 255, 255, 0.4) !important;

  :hover {
    border: 2px solid rgba(0, 0, 0, 0) !important;
  }
`;
