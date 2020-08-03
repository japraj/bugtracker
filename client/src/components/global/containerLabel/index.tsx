import React from "react";
import styled from "styled-components";

// Notes: container element must have position: relative
// the Fieldset will apply a border to the container element
// so if a border is manually set, the borders will overlap,
// resulting in a thick, ugly border.

export default ({ label }: { label: string }) => (
  <React.Fragment>
    <Label>{label}</Label>
    <Fieldset aria-hidden="true">
      <Legend>
        <Span>{label}</Span>
      </Legend>
    </Fieldset>
  </React.Fragment>
);

const Label = styled.label`
  color: rgba(255, 255, 255, 0.7);
  padding: 0;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
  top: 0;
  left: 0;
  position: absolute;
  transform-origin: top left;
  pointer-events: none;
  z-index: 1;
  transform: translate(14px, -6px) scale(0.75);
  vertical-align: baseline;
`;

const Fieldset = styled.fieldset`
  border-color: rgba(255, 255, 255, 0.23);
  top: -5px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0 8px;
  overflow: hidden;
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-radius: inherit;
  pointer-events: none;
`;

const Legend = styled.legend`
  max-width: 1000px;
  transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
  width: auto;
  height: 11px;
  display: block;
  padding: 0;
  font-size: 0.75em;
  text-align: left;
  visibility: hidden;
`;

const Span = styled.span`
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
`;
