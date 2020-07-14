import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 3rem;
  background-color: var(--blue);
  border: 1px solid var(--darker);
  margin: 0;
  height: auto;
  width: 80%;
`;

export default ({ text }: { text: string }) => {
  return <Button className="hoverfx">{text}</Button>;
};
