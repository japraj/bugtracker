import React from "react";
import Routes from "../../../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { toggleDisplay } from "../../../../flux/slices/ticketSlice";
import { selectAuthenticated } from "../../../../flux/slices/authSlice";
import history from "../../../../routes/history";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../../constants/materialui";
import EditControls from "../../../input/editControls";
import API from "../../../../api";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CommentBox>
        <TextField
          className="commentBox"
          label="Add a comment"
          multiline
          rows={4}
          value={value}
          variant="outlined"
          onChange={handleChange}
        />
        <EditControls
          className="editControls"
          submitText="Submit"
          submitCallback={() => {
            if (!authenticated) {
              dispatch(toggleDisplay());
              history.push(Routes.LOGIN_REQUIRED);
              return;
            }
            dispatch(API.addComment(value));
            setValue("");
          }}
          showCancel={false}
          cancelCallback={() => {}}
        />
      </CommentBox>
    </ThemeProvider>
  );
};

const CommentBox = styled.form`
  padding-top: 0.5rem;
  max-width: 900px;
  width: 100%;
  margin: 1rem 0;

  .commentBox {
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    margin-bottom: 1rem;

    textarea {
      color: var(--text-color);
    }
  }

  .editControls {
    padding-right: 0;
  }
`;
