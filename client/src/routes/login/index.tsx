import React from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../flux/slices/authSlice";
import FormPage from "../formPage";
import HyperLink from "../../components/global/hyperLink";
import { toast } from "react-toastify";
import history from "../history";
import Routes from "../../constants/routes";
import { generateLocalUserFromDTO } from "../../constants/user";
import Endpoints from "../../constants/api";
import styled from "styled-components";

interface State {
  usernameError: boolean;
  passwordError: boolean;
}

export default () => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState<State>({
    usernameError: false,
    passwordError: false,
  });

  const verifyValues = (fields: string[]) => () => {
    // verify inputs
    fetch(Endpoints.LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag: fields[0],
        password: fields[1],
      }),
    })
      .then((res) => res.json())
      .then((res: any) => {
        console.log(res);
        if (res.Tag === undefined && res.status !== undefined)
          throw new Error();
        fetch(Endpoints.LOAD_SESSION, { method: "GET" })
          .then((res) => res.json())
          .then((res: any) => {
            console.log(res);
            if (res.Tag === undefined && res.status !== undefined)
              throw new Error();
            dispatch(loadUser(generateLocalUserFromDTO(res)));
            toast.success("Successfully logged in!");
            history.push(Routes.HOME);
          })
          .catch(() => {
            toast.error("Error, please try again.");
            throw new Error();
          });
      })
      .catch(() => {
        setValues({
          usernameError: true,
          passwordError: true,
        });
      });
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
          <HyperLink to={Routes.FORGOT_PASS}>Forgot Password?</HyperLink>
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
