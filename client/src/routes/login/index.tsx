import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../flux/slices/authSlice";
import { selectElementsByKeys } from "../../flux/slices/contextSlice";
import FormPage from "../formPage";
import HyperLink from "../../components/global/hyperLink";
import { toast } from "react-toastify";
import history from "../history";
import Routes from "../../constants/routes";
import { generateLocalUserFromDTO } from "../../constants/user";
import Endpoints from "../../constants/api";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  const getNotificationByIds = useSelector(selectElementsByKeys("activity"));
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
        fetch(Endpoints.LOAD_SESSION, { method: "GET" })
          .then((res) => res.json())
          .then((res: any) => {
            console.log(res);
            if (res.Tag === undefined && res.status !== undefined)
              throw new Error();
            dispatch(
              loadUser(
                generateLocalUserFromDTO(res, (ids: number[]) =>
                  getNotificationByIds(ids.map((id) => id.toString()))
                )
              )
            );
            history.push(Routes.HOME);
          })
          .catch(() => {
            toast.error("Error, please try again.");
            throw new Error();
          });
      })
      .catch(() => {
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
    />
  );
};

const LinkWrapper = styled.div`
  width: 40%;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
`;
