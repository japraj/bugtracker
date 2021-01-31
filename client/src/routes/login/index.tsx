import React from "react";
import { useDispatch } from "react-redux";
import FormPage from "../formPage";
import HyperLink from "../../components/global/hyperLink";
import { toast } from "react-toastify";
import Routes from "../../constants/routes";
import Endpoints from "../../constants/api";
import API from "../../api";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);

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
      .then(() => {
        dispatch(API.loadSession(() => setError(true)));
      })
      .catch(() => {
        toast.error("Error, please try again.");
        setError(true);
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
      fieldErrors={[error, error]}
      buttonText="Login"
      displayButtonSibling={true}
      buttonSibling={
        <LinkWrapper>
          <HyperLink to={Routes.FORGOT_PASS}>Forgot Password?</HyperLink>
        </LinkWrapper>
      }
      onSubmit={verifyValues}
      suggest={true}
    />
  );
};

const LinkWrapper = styled.div`
  width: 40%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;
