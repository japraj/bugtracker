import React from "react";
import { TypeLabel } from "../../../constants/ticket";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

export default ({ label }: { label: number }) => {
  return (
    <TicketTag
      className={TypeLabel[label].toLowerCase().replace(/\s+/g, "_")}
      size="small"
      type={label}
      label={TypeLabel[label]}
    />
  );
};

const TicketTag = styled(Chip)`
  font-size: 0.7rem !important;
  margin-right: 0.5rem;
  span {
    color: ${(props: { type: number }) =>
      props.type === TypeLabel.Bug ? "black" : "black"};
  }
`;
