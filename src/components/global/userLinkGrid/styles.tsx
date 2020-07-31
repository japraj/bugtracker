import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

export const UserLinkGrid = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    user-select: none;
    text-align: left;
    width: 100%;
    padding-bottom: 0.8rem;
    border-bottom: var(--ticket-border);
    color: var(--text-color);
    margin-bottom: 1rem;
  }
`;

export const SetWrapper = styled.div`
  padding-left: 0.5rem;
  width: 100%;
  max-width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, 30px);
  grid-gap: 1.5rem;
`;

export const UserLinkWrapper = styled.div`
  position: relative;
`;

export const Clickable = styled(Icon)`
  position: absolute;
  bottom: 0;
  right: -5px;
  color: var(--text-color);
  border-radius: 50%;
  font-size: 1rem !important;
  transition: transform 0.15s ease-out;

  :hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
