import React from "react";
import FormPage from "../formPage";
import history from "../history";
import { Alert } from "rsuite";

interface State {
  emailError: boolean;
  usernameError: boolean;
  passwordError: boolean;
}

export default () => {
  const [values, setValues] = React.useState<State>({
    emailError: false,
    usernameError: false,
    passwordError: false,
  });

  const verifyValues = (fields: string[]) => () => {
    // verify inputs

    const duplicateEmail: boolean = true;

    if (duplicateEmail)
      Alert.error("An account with this e-mail already exists.", 3000);

    const emailError: boolean = true;
    const usernameError: boolean = true;
    const passwordError: boolean = true;

    setValues({
      emailError: emailError,
      usernameError: usernameError,
      passwordError: passwordError,
    });

    if (!emailError && !usernameError && !passwordError) history.push("/login");
  };

  return (
    <FormPage
      formHeader="Register"
      formFields={[
        {
          label: "Email",
          labelWidth: 40,
          type: "email",
          required: true,
        },
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
      buttonText="Register"
      displayButtonSibling={false}
      buttonSibling={<React.Fragment />}
      onSubmit={verifyValues}
    />
  );
};