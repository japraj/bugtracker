import React from "react";
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
    .map((key) => {
      output.push({ label: prefix + ": " + capitalize(key), value: key });
    });
  return output;
};

interface Props {
  statusCondition: boolean;
  onStatusChange: (newValue: string) => void;
  severityCondition: boolean;
  onSeverityChange: (newValue: string) => void;
  reproducibilityCondition: boolean;
  onReproducibilityChange: (newValue: string) => void;
  tagCondition: boolean;
  onTagChange: (newValue: string) => void;
  defaultTitle: string;
  onTitleChange: (newValue: string) => void;
  defaultDesc: string;
  onDescChange: (newValue: string) => void;
}

export default (props: Props) => {
  return (
    <React.Fragment>
      <SelectGrid>
        <TicketFormSelect
          display={props.statusCondition}
          onChange={props.onStatusChange}
          options={mapEnumToSelectOption("Status", Status)}
        />
        <TicketFormSelect
          display={props.severityCondition}
          onChange={props.onSeverityChange}
          options={mapEnumToSelectOption("Severity", Severity)}
        />
        <TicketFormSelect
          display={props.reproducibilityCondition}
          onChange={props.onReproducibilityChange}
          options={mapEnumToSelectOption("Reproducibility", Reproducibility)}
        />
        <TicketFormSelect
          display={props.tagCondition}
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
        </ThemeProvider>
      </TextWrapper>
    </React.Fragment>
  );
};

const TicketFormSelect = (props: {
  display: boolean;
  onChange: (newValue: string) => void;
  options: SelectOption[];
}) => (
  <SelectWrapper display={props.display}>
    <Select
      onChange={props.onChange}
      options={props.options}
      width={250}
      mobileWidth={window.innerWidth < 350 ? 200 : 300}
    />
  </SelectWrapper>
);

const SelectWrapper = styled.div`
  ${(props: { display: boolean }) => (props.display ? "" : "display: none;")}
  height: 43px;
`;

const SelectGrid = styled.div`
  padding: 1rem 0 2rem;
  display: grid;
  grid-gap: 2rem 3rem;

  @media (min-width: 650px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;

  .textSection {
    width: 100%;
    margin-bottom: 1rem;
  }
`;
