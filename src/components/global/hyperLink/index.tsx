import { Link } from "react-router-dom";
import styled from "styled-components";

// Simple wrapper for react-router-dom Link
// Never use anchor tags (unless redirecting
// to an external page

export default styled(Link)`
  color: var(--highlight);
  text-decoration: none;
`;
