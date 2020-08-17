import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { SelectOption } from "../../../constants/global";
import { theme } from "../../../constants/materialui";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./MUIOverride.css";
import { FormWrapper, Form } from "./styles";

type Props = {
  fixedWidth: boolean;
  width: number;
  mobileWidth: number;
  onChange: (newValue: string) => void;
  options: SelectOption[];
  value?: number | string;
  disabled?: boolean;
};

export default (props: Props) => {
  const [internalVal, setInternalVal] = React.useState(props.options[0].value);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInternalVal(event.target.value as string);
    props.onChange(event.target.value as string);
  };
  const value =
    props.value === undefined
      ? internalVal
      : typeof props.value === "string"
      ? props.value
      : props.options[props.value].value;

  // Note: options[0] is used as defaultValue
  return (
    <FormWrapper className="selectFormWrapper">
      <ThemeProvider theme={theme}>
        <Form
          fixedwidth={props.fixedWidth}
          width={props.width}
          mobilewidth={props.mobileWidth}
          disabled={props.disabled == null ? false : props.disabled}
        >
          <Select
            labelId="select-label"
            id="select"
            value={value}
            onChange={handleChange}
          >
            {props.options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Form>
      </ThemeProvider>
    </FormWrapper>
  );
};
