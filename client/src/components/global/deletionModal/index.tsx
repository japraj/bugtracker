import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forceCloseDisplays,
  selectTicket,
} from "../../../app/flux/slices/ticketSlice";
import { Alert } from "rsuite";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import { ThemeProvider } from "@material-ui/core/styles";
import { Ticket, theme, useStyles } from "../../../app/constants";
import clsx from "clsx";
import Button from "../../input/button";
import { ModalContentWrapper } from "../../container/modalContent";
import styled from "styled-components";

export default (props: { display: boolean }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ticket: Ticket = useSelector(selectTicket);
  const [state, assignState] = React.useState({
    error: false,
    isOpen: false,
    value: "",
  });

  // wrapper func to simplify state changes
  const setState = (newState: {
    error?: boolean;
    isOpen?: boolean;
    value?: string;
  }) => assignState(Object.assign({}, state, newState));

  const open = () => setState({ isOpen: true });

  const close = () => setState({ isOpen: false, value: "" });

  const submit = () => {
    const valid = state.value.toLowerCase() === "delete";
    setState({ error: !valid });
    if (valid) {
      dispatch(forceCloseDisplays());
      // Make fetch request deleting stuff,
      // remove from store.
      Alert.success(`Successfully deleted issue #${ticket.id}`, 3000);
    }
  };

  return props.display ? (
    <React.Fragment>
      <Delete onClick={open} children="Delete" />
      <Modal
        disableScrollLock={false}
        style={{ zIndex: 13 }}
        open={state.isOpen}
        onClose={close}
        aria-labelledby="Deletion Modal"
        aria-describedby="A menu through which an issue can be permanently deleted."
      >
        <ModalContent width="calc(280px + 3rem)">
          <ThemeProvider theme={theme}>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel className={state.error ? "error" : ""}>
                Type 'DELETE' to confirm
              </InputLabel>
              <OutlinedInput
                className="input"
                required={true}
                type="text"
                error={state.error}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setState({ value: event.target.value.toUpperCase() })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="submit deletion request"
                      onClick={submit}
                      edge="end"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={180}
              />
            </FormControl>
          </ThemeProvider>
        </ModalContent>
      </Modal>
    </React.Fragment>
  ) : (
    <React.Fragment />
  );
};

export const Delete = styled(Button)`
  background-color: var(--theme-darkred) !important;
  margin-right: auto !important;
`;

export const ModalContent = styled(ModalContentWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3rem 1rem;
  height: 110px;
  top: calc(40vh - 50px);

  .input,
  .MuiFormControl-root {
    width: 280px;
  }

  .error {
    color: rgb(244, 67, 54) !important;
  }
`;
