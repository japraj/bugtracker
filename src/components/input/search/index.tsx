import React from "react";
import theme from "../InputTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "../button";
import { SearchWrapper, SearchIcon } from "./styles";

interface Props {
  label: string;
  onChange: () => void;
  onSubmit: () => void;
}

export default (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchWrapper>
        <Input
          onKeyDown={(event: React.KeyboardEvent): void => {
            if (event.keyCode === 13) {
              event.preventDefault();
              event.stopPropagation();
              props.onSubmit();
            }
          }}
          placeholder={props.label}
        />
        <Button className="searchButton hoverfx" onClick={props.onSubmit}>
          <SearchIcon>search</SearchIcon>
        </Button>
      </SearchWrapper>
    </ThemeProvider>
  );
};
