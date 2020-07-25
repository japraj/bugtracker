import styled from "styled-components";

export const InputWrapper = styled.div`
  label {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  div {
    width: ${(props: { width: string }) => props.width};

    input {
      text-align: center;
    }
  }
`;
