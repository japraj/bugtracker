import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDemoMode } from "../../flux/slices/authSlice";
import { addUsers } from "../../flux/slices/contextSlice";
import { getUserFromDTO } from "../../constants/user";
import FormPage from "../formPage";
import Endpoints from "../../constants/api";
import API from "../../api";
import { toast } from "react-toastify";

interface State {
  emailError: boolean;
  usernameError: boolean;
  passwordError: boolean;
}

export default () => {
  const dispatch = useDispatch();
  const demoMode: boolean = useSelector(selectDemoMode);
  const [values, setValues] = React.useState<State>({
    emailError: false,
    usernameError: false,
    passwordError: false,
  });

  const evaluateError = (err: any): void => {
    try {
      const keys = Object.keys(err.errors);
      // Generate toasts
      keys.forEach((key) =>
        err.errors[key].map((msg: string) => toast.error(msg))
      );

      // Check if the error messages are of a specific type (for instance, are there
      // any errors related to passwords?)
      const getBlame = (match: string): boolean => {
        for (var key of keys) if (key.includes(match)) return true;
        return false;
      };

      setValues({
        emailError: getBlame("email"),
        usernameError: getBlame("name") ? true : getBlame("tag"),
        passwordError: getBlame("password"),
      });
    } catch {}
  };

  const verifyValues = (fields: string[]) => () => {
    if (demoMode) {
      toast.error(
        "Sorry, this feature is unavailable. Reload the page to exit the demo."
      );
      return;
    }

    fetch(Endpoints.REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: fields[0],
        tag: fields[1],
        password: fields[2],
      }),
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.Tag === undefined && res.status !== undefined) {
          evaluateError(res);
        } else {
          dispatch(addUsers([getUserFromDTO(res)]));
          dispatch(
            API.loadSession(() => {
              toast.error("Something went wrong; please try again.");
            })
          );
        }
      })
      .catch((err) => evaluateError(err));
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
      fieldErrors={[
        values.emailError,
        values.usernameError,
        values.passwordError,
      ]}
      buttonText="Register"
      displayButtonSibling={false}
      buttonSibling={<React.Fragment />}
      onSubmit={verifyValues}
    />
  );
};
