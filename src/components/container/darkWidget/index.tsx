import styled from "styled-components";
import { WidgetWrapper, WidgetHeader, WidgetSection } from "../widget";

// A generic container, meant to be used only on pages where
// it is the sole content (like login/register/404/authError)
// If multiple pieces of content (with separate containers)
// are required, then the normal Widget should be used.

export const DarkWidgetWrapper = styled.section`
  height: calc(100vh - var(--nav-height) - 2rem - 8px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DarkWidget = styled(WidgetWrapper)`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 32px;
  margin-bottom: 20vh;

  @media (max-width: 800px) {
    margin-bottom: 10vh;
  }

  @media (max-width: 600px) {
    padding: 32px 10px;
  }
`;

export const DarkWidgetHeader = styled(WidgetHeader)`
  border-bottom: none;
  box-shadow: none;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const DarkWidgetSection = styled(WidgetSection)`
  border-bottom: none;
  box-shadow: none;
`;
