import React from "react";
import {
  DarkWidgetWrapper,
  DarkWidget,
  DarkWidgetHeader,
  DarkWidgetSection,
} from "../../components/container/darkWidget/DarkWidget";
import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../components/input/InputTheme";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "../../components/input/button/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  })
);

type FormField = {
  label: string;
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
      {formField.type === "text" ? (
        <OutlinedInput
          required={formField.required}
          error={props.fieldErrors[index]}
          type={"text"}
          value={values.fields[index]}
          labelWidth={70}
          onChange={handleFieldChange(index)}
        />
      ) : (
        <OutlinedInput
          required={formField.required}
          type={values.showPassword ? "text" : "password"}
          //   value={values.fields[index]}
          error={props.fieldErrors[index]}
          onChange={handleFieldChange(index)}
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
            <FormSection>
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

const FormWidget = styled(DarkWidget)`
  width: 350px;
`;

const FormHeader = styled(DarkWidgetHeader)`
  font-size: 2.25rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error {
    color: rgb(244, 67, 54) !important;
  }
`;

const FormSection = styled(DarkWidgetSection)`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 8px;

  .formButton {
    background-color: var(--highlight);
    margin-right: auto;
    font-size: 1.15rem !important;
  }
`;
