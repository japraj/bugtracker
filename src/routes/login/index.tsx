import React from "react";
import FormPage from "../formPage";
import HyperLink from "../../components/global/hyperLink";
import history from "../history";
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
          labelWidth: 75,
          type: "text",
          required: true,
        },
        {
          label: "Password",
          labelWidth: 70,
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
    />
  );
};

const LinkWrapper = styled.div`
  width: 40%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;
