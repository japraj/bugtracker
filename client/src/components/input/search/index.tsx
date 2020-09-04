import React from "react";
import { theme } from "../../../constants/materialui";
import { ThemeProvider } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "../button";
import { SearchWrapper, SearchIcon } from "./styles";

interface Props {
  label: string;
  onChange: (newValue: string) => void;
}

export default (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchWrapper>
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.value)
          }
          // onKeyDown={(event: React.KeyboardEvent): void => {
          //   if (event.keyCode === 13) {
          //     event.preventDefault();
          //     event.stopPropagation();
          //     props.onSubmit();
          //   }
          // }}
          placeholder={props.label}
        />
        <Button
          className="searchButton hoverfx"
          onClick={() => {}}
          //onClick={props.onSubmit}
        >
          <SearchIcon>search</SearchIcon>
        </Button>
      </SearchWrapper>
    </ThemeProvider>
  );
};
