import React, { useState } from "react";
import theme from "../InputTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { InputWrapper } from "./styles";

interface Props {
  className: string;
  showLabel: boolean;
  labelText: string;
  inputWidth: string;
  placeholder: string;
  setDefaultValue: boolean;
  defaultValue: number | string;
  type: string;
  onSubmit: (value: unknown) => void;
}

export default (props: Props) => {
  const [newVal, setNewVal] = useState(
    props.setDefaultValue
      ? props.defaultValue
      : props.type === "string"
      ? ""
      : 0
  );
  return (
    <ThemeProvider theme={theme}>
      <InputWrapper width={props.inputWidth} className={props.className}>
        {props.showLabel ? (
          <label>{props.labelText}</label>
        ) : (
          <React.Fragment />
        )}
        <Input
          style={{ width: "inputWidth" }}
          type={props.type}
          placeholder={props.placeholder}
          value={newVal}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNewVal(event.target.value)
          }
          onKeyDown={(event: React.KeyboardEvent): void => {
            if (event.keyCode === 13) {
              event.preventDefault();
              event.stopPropagation();
              props.onSubmit(newVal);
            }
          }}
        />
      </InputWrapper>
    </ThemeProvider>
  );
};
