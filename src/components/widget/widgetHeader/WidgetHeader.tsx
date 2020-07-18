import styled from "styled-components";

export default styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--dark);
  padding: 16px 22px 14px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.12);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  h1 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.25rem;
  }
`;
