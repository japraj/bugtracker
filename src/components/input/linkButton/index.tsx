import { Link } from "react-router-dom";
import styled from "styled-components";

export default styled(Link)`
  color: var(--highlight);
  text-decoration: none;
  background: rgba(0, 0, 0, 0);
  text-align: center;
  white-space: nowrap;
  touch-action: manipulation;
  line-height: 1.3333333;
  font-size: 14px;
  padding: 5px 8px;
  width: auto;
  height: auto;
  border-radius: 5px;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transition: transform 0.25s ease-out;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    transform: scale(1.05);
    background-color: var(--highlight);
    color: var(--text-color);
  }
`;
