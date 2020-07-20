import styled from "styled-components";

export const WidgetWrapper = styled.section`
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  padding-bottom: 0.5rem;
  height: auto;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
`;

export const WidgetHeader = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 22px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.12);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  i {
    margin-right: 0.7rem;
    font-size: 1.25rem;
  }

  h1 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.25rem;
  }
`;

export const WidgetSection = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.12);
  padding: 0.25rem 1rem;
  margin: 0.1rem 0;
  width: 100%;
`;
