import React from "react";
import FormPage from "../formPage/FormPage";
import HyperLink from "../../components/global/hyperLink/HyperLink";
import history from "../../app/history";
import styled from "styled-components";

interface State {
  usernameError: boolean;
  passwordError: boolean;
}

export default () => {
  const [values, setValues] = React.useState<State>({
    usernameError: false,
    passwordError: false,
  });

  const verifyValues = (fields: string[]) => () => {
    // verify inputs

    const usernameError: boolean = true;
    const passwordError: boolean = true;

    setValues({
      usernameError: usernameError,
      passwordError: passwordError,
    });

    if (!usernameError && !passwordError) history.push("/");
  };

  return (
    <FormPage
      formHeader="Login"
      formFields={[
        {
          label: "Username",
          type: "text",
          required: true,
        },

        {
          label: "Password",
          type: "password",
          required: true,
        },
      ]}
      fieldErrors={[values.usernameError, values.passwordError]}
      buttonText="Login"
      displayButtonSibling={true}
      buttonSibling={
        <LinkWrapper>
          <HyperLink to="/resetPassword">Forgot Password?</HyperLink>
        </LinkWrapper>
      }
      onSubmit={verifyValues}
      bottomLink={{
        text: "Don't have an account yet? Go to the Register Page!",
        to: "/register",
      }}
    />
  );
};

const LinkWrapper = styled.div`
  width: 40%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;
