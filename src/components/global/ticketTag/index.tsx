import React from "react";
import { TypeLabel } from "../../../app/constants";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

export default ({ label }: { label: number }) => {
  return (
    <TicketTag
      className={TypeLabel[label].toLowerCase().replace(/\s+/g, "_")}
      size="small"
      label={TypeLabel[label]}
    />
  );
};

const TicketTag = styled(Chip)`
  font-size: 0.7rem !important;
  margin-right: 0.5rem;
`;
