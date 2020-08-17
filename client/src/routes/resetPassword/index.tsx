import React from "react";
import Routes from "../../constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticated, logout } from "../../flux/slices/authSlice";
import { theme, useStyles } from "../../constants/materialui";
import { DarkWidgetWrapper } from "../../components/container/darkWidget";
import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "../../components/input/button";
import { toast } from "react-toastify";
import history from "../history";
import {
  FormWrapper,
  FormWidget,
  FormHeader,
  FormSection,
} from "../formPage/styles";

const checkTokenValidity = (token: string): boolean => {
  let valid: boolean = true;
  // send token to backend for validation (fetch req)
  return valid;
};

export default ({ match }: { match: any }) => {
  const dispatch = useDispatch();
  const authenticated: boolean = useSelector(selectAuthenticated);
  const classes = useStyles();
  const [showPassword, setVisibility] = React.useState([false, false]);
  const [fields, setFields] = React.useState(["", ""]);
  const [error, setError] = React.useState(false);

  if (!checkTokenValidity(match.params.token))
    history.push(Routes.INVALID_TOKEN);
  if (authenticated) dispatch(logout());

  const handleFieldChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let copy: string[] = fields;
    copy[index] = event.target.value;
    setFields(copy);
  };

  const submit = () => {
    if (fields[0] !== fields[1]) {
      setError(true);
      toast.error("Passwords do not match.");
      return;
    }
    // make a post request resetting password
  };

  const fieldNodes = ["New Password", "Confirm Password"].map(
    (formField, index) => (
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        key={formField}
      >
        <InputLabel className={error ? "error" : ""}>{formField}</InputLabel>
        <OutlinedInput
          required={true}
          type={showPassword[index] ? "text" : "password"}
          error={error}
          onChange={handleFieldChange(index)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className=""
                aria-label="toggle password visibility"
                onClick={() => {
                  let copy: boolean[] = Object.assign([], showPassword);
                  copy[index] = !showPassword[index];
                  setVisibility(copy);
                }}
                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                  event.preventDefault()
                }
                edge="end"
              >
                {showPassword[index] ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={index === 0 ? 108 : 133}
        />
      </FormControl>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <DarkWidgetWrapper>
        <FormWidget>
          <FormHeader>Reset Password</FormHeader>
          <FormWrapper>
            {fieldNodes}
            <FormSection setMargin={false}>
              <Button className="formButton hoverfx" onClick={submit}>
                Submit
              </Button>
            </FormSection>
          </FormWrapper>
        </FormWidget>
      </DarkWidgetWrapper>
    </ThemeProvider>
  );
};
