import React from "react";
import { DarkWidgetWrapper } from "../../components/container/darkWidget";
import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, useStyles } from "../../constants/materialui";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "../../components/input/button";
import { FormWrapper, FormWidget, FormHeader, FormSection } from "./styles";

type FormField = {
  label: string;
  labelWidth: number;
  type: string;
  required: boolean;
};

interface Props {
  formHeader: string;
  formFields: FormField[];
  fieldErrors: boolean[];
  buttonText: string;
  displayButtonSibling: boolean;
  buttonSibling: React.ReactNode;
  onSubmit: (fields: string[]) => () => void;
  suggest?: boolean;
}

interface State {
  fields: string[];
  showPassword: boolean;
}

export default (props: Props) => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    fields: props.fieldErrors.map(() => ""),
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFieldChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let copy: string[] = values.fields;
    copy[index] = event.target.value;
    setValues({ ...values, fields: copy });
  };

  const fieldNodes = props.formFields.map((formField, index) => (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
      key={formField.label}
    >
      <InputLabel className={props.fieldErrors[index] ? "error" : ""}>
        {formField.label}
      </InputLabel>
      {formField.type !== "password" ? (
        <OutlinedInput
          required={formField.required}
          error={props.fieldErrors[index]}
          type={formField.type}
          value={values.fields[index]}
          labelWidth={formField.labelWidth}
          onChange={handleFieldChange(index)}
        />
      ) : (
        <OutlinedInput
          required={formField.required}
          type={values.showPassword ? "text" : "password"}
          error={props.fieldErrors[index]}
          onChange={handleFieldChange(index)}
          onKeyDown={(event: React.KeyboardEvent): void => {
            if (event.keyCode === 13) {
              event.preventDefault();
              event.stopPropagation();
              props.onSubmit(values.fields)();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
          autoComplete={props.suggest ? "on" : "off"}
        />
      )}
    </FormControl>
  ));
  return (
    <ThemeProvider theme={theme}>
      <DarkWidgetWrapper>
        <FormWidget>
          <FormHeader>{props.formHeader}</FormHeader>
          <FormWrapper>
            {fieldNodes}
            <FormSection setMargin={props.displayButtonSibling}>
              <Button
                className="formButton hoverfx"
                onClick={props.onSubmit(values.fields)}
              >
                {props.buttonText}
              </Button>
              {props.displayButtonSibling ? (
                props.buttonSibling
              ) : (
                <React.Fragment />
              )}
            </FormSection>
          </FormWrapper>
        </FormWidget>
      </DarkWidgetWrapper>
    </ThemeProvider>
  );
};
