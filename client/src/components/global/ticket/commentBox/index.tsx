import React from "react";
import Routes from "../../../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  toggleDisplay,
  selectTicket,
} from "../../../../flux/slices/ticketSlice";
import { selectAuthenticated } from "../../../../flux/slices/authSlice";
import { harmonizeContext } from "../../../../flux/slices/contextSlice";
import history from "../../../../routes/history";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../../constants/materialui";
import Endpoints from "../../../../constants/api";
import EditControls from "../../../input/editControls";
import { toast } from "react-toastify";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  const ticket = useSelector(selectTicket);
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
            // make a post request
            fetch(Endpoints.ADD_COMMENT, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: value,
                ticketId: ticket.id,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                dispatch(addComment(res.id));
                dispatch(harmonizeContext(true));
                setValue("");
              })
              .catch((e) => {
                console.log(e);
                toast.error("Error, please try again.");
              });
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
