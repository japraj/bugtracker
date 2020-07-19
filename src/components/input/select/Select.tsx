import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import "./MUIOverride.css";

export interface SelectOption {
  value: string;
  label: string;
}

type Props = {
  width: number;
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
        <Form width={props.width}>
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
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#209e91",
    },
    secondary: {
      main: "#209e91",
    },
  },
});

const FormWrapper = styled.div`
  display: flex;
  justify-content: auto;
  align-items: auto;
  height: 100%;
  width: auto;
`;

const Form = styled(FormControl)`
  width: ${(props: { width: number }) => props.width}px;

  #select-label,
  #select {
    color: var(--text-color);
  }

  #select {
    padding: 12px;
    text-align: left;
  }

  input {
    border-color: white;
    color: white;
  }
`;
