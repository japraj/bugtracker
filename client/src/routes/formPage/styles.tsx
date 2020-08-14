import {
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget";
import styled from "styled-components";

export const FormWidget = styled(DarkWidget)`
  width: 350px;

  .MuiFormControl-root {
    margin: 8px;
  }

  @media (max-width: 380px) {
    width: 90vw;
  }
`;

export const FormHeader = styled(DarkWidgetHeader)`
  font-size: 1.5rem;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error {
    color: rgb(244, 67, 54) !important;
  }
`;

export const FormSection = styled(DarkWidgetSection)`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 8px;

  .formButton {
    background-color: var(--highlight);
    margin-right: ${(props: { setMargin: boolean }) =>
      props.setMargin ? "auto" : "0"};
    font-size: 1.15rem !important;
  }
`;
