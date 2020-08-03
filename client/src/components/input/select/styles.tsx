import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";

export const FormWrapper = styled.div`
  display: flex;
  justify-content: auto;
  align-items: auto;
  height: 100%;
  width: auto;
`;

interface FormProps {
  fixedwidth: boolean;
  width: number;
  mobilewidth: number;
}

export const Form = styled(FormControl)`
  width: ${(props: FormProps) =>
    props.fixedwidth ? `${props.width}px` : "100%"};

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
    width: ${(props: FormProps) =>
      props.fixedwidth ? `${props.mobilewidth}px` : "100%"};

    div {
      font-size: 12px !important;
    }
  }
`;