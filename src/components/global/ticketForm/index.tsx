import React, { useState } from "react";
import {
  SelectOption,
  Status,
  Severity,
  Reproducibility,
  TypeLabel,
} from "../../../app/constants";
import Select from "../../input/select";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import ImageLinks from "../imageLinks";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../app/constants";

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.substring(1);

const mapEnumToSelectOption = (
  prefix: string,
  givenEnum: any
): SelectOption[] => {
  let output: SelectOption[] = [];
  Object.keys(givenEnum)
    .filter((key) => !isNaN(Number(givenEnum[key])))
    .map((key) =>
      output.push({ label: prefix + ": " + capitalize(key), value: key })
    );
  return output;
};

interface Props {
  displaySelects: boolean;
  onStatusChange: (newValue: string) => void;
  onSeverityChange: (newValue: string) => void;
  onReproducibilityChange: (newValue: string) => void;
  onTagChange: (newValue: string) => void;
  defaultTitle: string;
  onTitleChange: (newValue: string) => void;
  defaultDesc: string;
  onDescChange: (newValue: string) => void;
  defaultLinks: string[];
  onLinksChange: (newArray: string[]) => void;
}

export default (props: Props) => {
  return (
    <React.Fragment>
      <SelectGrid display={props.displaySelects}>
        <TicketFormSelect
          onChange={props.onStatusChange}
          options={mapEnumToSelectOption("Status", Status)}
        />
        <TicketFormSelect
          onChange={props.onSeverityChange}
          options={mapEnumToSelectOption("Severity", Severity)}
        />
        <TicketFormSelect
          onChange={props.onReproducibilityChange}
          options={mapEnumToSelectOption("Reproducibility", Reproducibility)}
        />
        <TicketFormSelect
          onChange={props.onTagChange}
          options={mapEnumToSelectOption("Tag", TypeLabel)}
        />
      </SelectGrid>
      <TextWrapper>
        <ThemeProvider theme={theme}>
          <TextField
            className="textSection"
            label="Title"
            rows={1}
            defaultValue={props.defaultTitle}
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.onTitleChange(event.target.value)
            }
          />
          <TextField
            className="textSection"
            label="Description"
            multiline
            rows={4}
            defaultValue={props.defaultDesc}
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              props.onDescChange(event.target.value)
            }
          />
          <ImageLinks
            imageLinks={props.defaultLinks}
            onChange={props.onLinksChange}
          />
        </ThemeProvider>
      </TextWrapper>
    </React.Fragment>
  );
};

const TicketFormSelect = (props: {
  onChange: (newValue: string) => void;
  options: SelectOption[];
}) => (
  <SelectWrapper>
    <Select
      fixedWidth={false}
      {...props}
      width={250}
      mobileWidth={window.innerWidth < 350 ? 200 : 300}
    />
  </SelectWrapper>
);

const SelectWrapper = styled.div`
  height: 43px;
`;

const SelectGrid = styled.div`
  ${(props: { display: boolean }) => (props.display ? "" : "display: none;")}
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  background-color: rgba(255, 255, 255, 0.1);
  padding: 18.5px 14px 2rem;
  margin: 2rem auto;
  display: grid;
  grid-gap: 2rem 3rem;
  width: calc(100% - 4rem);
  justify-content: center;
  grid-template-columns: repeat(2, calc(50% - 28px));

  @media (max-width: 650px) {
    grid-template-columns: calc(100% - 14px);
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;

  .textSection {
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    margin-bottom: 2rem;
  }
`;
