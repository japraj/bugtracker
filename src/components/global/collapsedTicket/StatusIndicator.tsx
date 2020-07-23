import React from "react";
import styled from "styled-components";

interface Props {
  className: string;
  styles: StyledProps;
}

export default (props: Props) => {
  return <StatusIndicator className={props.className} styles={props.styles} />;
};

// Note: all values' units must be specified; the status indicator is always a square
interface StyledProps {
  length: string;
  rightMargin: string;
  leftMargin: string;
}

const StatusIndicator = styled.div`
  width: ${(props: { styles: StyledProps }) => props.styles.length};
  height: ${(props: { styles: StyledProps }) => props.styles.length};
  border-radius: 50%;
  margin: 0 ${(props: { styles: StyledProps }) => props.styles.rightMargin} 0
    ${(props: { styles: StyledProps }) => props.styles.leftMargin};
`;
