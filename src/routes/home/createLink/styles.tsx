import { WidgetWrapper } from "../../../components/container/widget";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  min-width: 400px;
`;

export const LinkWidget = styled(WidgetWrapper)`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: var(--highlight);
    cursor: pointer;
  }

  h1 {
    margin-right: auto;
  }

  @media (max-width: 1100px) {
    .icon {
      font-size: 1.2rem;
    }

    h1 {
      font-size: 0.9rem;
    }
  }
`;
