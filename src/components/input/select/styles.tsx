import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";

export const FormWrapper = styled.div`
  display: flex;
  justify-content: auto;
  align-items: auto;
  height: 100%;
  width: auto;
`;

export const Form = styled(FormControl)`
  width: ${(props: { width: number; mobilewidth: number }) => props.width}px;

  #select-label,
  #select {
    color: var(--text-color);
  }

  #select {
    padding: 12px;
    text-align: left;
  }

  input {
    border-color: white;
    color: white;
  }

  @media (max-width: 600px) {
    width: ${(props: { width: number; mobilewidth: number }) =>
      props.mobilewidth}px;
    div {
      font-size: 12px !important;
    }
  }
`;
