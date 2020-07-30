import React from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../../app/constants";
import EditControls from "../../../input/editControls";
import styled from "styled-components";

export default () => {
  const [value, setValue] = React.useState("Controlled");

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
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
        />
        <EditControls
          showCancel={false}
          submitText="Submit"
          submitCallback={() => {}}
          cancelCallback={() => {}}
          className="editControls"
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
