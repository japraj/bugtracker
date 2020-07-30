import React, { useState } from "react";
import { theme } from "../../../app/constants";
import { ThemeProvider } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import styled from "styled-components";

// This component is a textfield merged with a button that has an icon within it.
// Example use cases are: search box (although there is a specialized search component too)
// copy-paste link widget, the controls for the imageLinks section in the create/edit modals

// Note: if editable is false, then the default value is the only value! This is good for a copy-paste widget

const consumeEvent = (event: React.KeyboardEvent): void => {
  event.preventDefault();
  event.stopPropagation();
};

export default (props: {
  label: string;
  labelWidth: number;
  defaultValue: string;
  editable: boolean;
  buttonIconName: string;
  clearInputOnSubmit: boolean;
  onSubmit: (arg0: string) => void;
  className: string;
}) => {
  const [inputValue, setInputValue] = useState(props.defaultValue);
  const submit = () => {
    props.onSubmit(inputValue);
    if (props.clearInputOnSubmit) setInputValue("");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container className={props.className}>
        <FormControl variant="outlined">
          <InputLabel>{props.label}</InputLabel>
          <OutlinedInput
            type="text"
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setInputValue(event.target.value)}
            onKeyDown={(event: React.KeyboardEvent): void => {
              if (!props.editable) consumeEvent(event);
              if (event.keyCode === 13) {
                consumeEvent(event);
                submit();
              }
            }}
            value={inputValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={submit}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                    event.preventDefault()
                  }
                  edge="end"
                >
                  <Icon>{props.buttonIconName}</Icon>
                </IconButton>
              </InputAdornment>
            }
            labelWidth={props.labelWidth}
          />
        </FormControl>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  width: 100%;

  > div {
    width: 100% !important;
  }

  .button {
    color: var(--text-color) !important;
    padding: 0.5rem !important;
    width: 32px !important;
    height: 32px !important;
    border-radius: 0 !important;
  }
`;
