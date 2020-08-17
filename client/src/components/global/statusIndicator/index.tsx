import React from "react";
import styled from "styled-components";
import { Status } from "../../../constants/ticket";

interface Props {
  status: number;
  styles: StyledProps;
}

export default (props: Props) => {
  return <StatusIndicator className={Status[props.status]} {...props.styles} />;
};

// Note: all values' units must be specified.
// The status indicator's width/height are both
// set to the given length dimension to ensure
// that it is a square. That way, we can apply
// border-radius: 50% and get a perfect
// circle!
interface StyledProps {
  length: string;
  rightMargin: string;
  leftMargin: string;
}

const length = (props: StyledProps): string => props.length;

const StatusIndicator = styled.div`
  width: ${length};
  min-width: ${length};
  max-width: ${length};
  height: ${length};
  min-height: ${length};
  max-height: ${length};
  border-radius: 50%;
  margin: 0 ${(props: StyledProps) => props.rightMargin} 0
    ${(props: StyledProps) => props.leftMargin};
`;
