import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, SelectOption } from "../../../app/constants";
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
};

export default (props: Props) => {
  const [age, setAge] = React.useState(props.options[0].value);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
    props.onChange(event.target.value as string);
  };
  // Note: options[0] is used as defaultValue
  return (
    <FormWrapper className="selectFormWrapper">
      <ThemeProvider theme={theme}>
        <Form
          fixedwidth={props.fixedWidth}
          width={props.width}
          mobilewidth={props.mobileWidth}
        >
          <Select
            labelId="select-label"
            id="select"
            value={age}
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
