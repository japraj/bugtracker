import React from "react";
import {
  SelectOption,
  Status,
  Severity,
  Reproducibility,
  TypeLabel,
} from "../../../app/constants";
import Select from "../../input/select";
import TextField from "@material-ui/core/TextField";
import ImageLinks from "../imageLinks";
import Modal from "@material-ui/core/Modal";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../app/constants";
import EditControls from "../../input/editControls";
import ContainerLabel from "../containerLabel";
import {
  ContentWrapper,
  SelectWrapper,
  SelectGrid,
  TextWrapper,
} from "./styles";

const keyToIndex = (givenKey: string, givenEnum: any): number => {
  for (let i = 0; i < Object.keys(givenEnum).length; i++)
    if (givenEnum[i] === givenKey) return i;
  return -1;
};

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
  ariaLabel: string;
  ariaDesc: string;
  open: boolean;
  close: () => void;
  update: (change: object) => void;
  submit: () => void;
  submitButtonText: string;
  displaySelects: boolean;
  displayAuthor: boolean;
  defaultTitle: string;
  defaultDesc: string;
  defaultLinks: string[];
  injectedNode: React.ReactNode;
}

export default (props: Props) => {
  return (
    <Modal
      disableScrollLock={false}
      style={{ zIndex: 13 }}
      open={props.open}
      onClose={props.close}
      aria-labelledby={props.ariaLabel}
      aria-describedby={props.ariaDesc}
    >
      <ContentWrapper width={window.innerWidth < 800 ? "95vw" : "700px"}>
        <SelectGrid display={props.displaySelects}>
          <ContainerLabel label="Properties" />
          <TicketFormSelect
            onChange={(newValue: string) =>
              props.update({ status: keyToIndex(newValue, Status) })
            }
            options={mapEnumToSelectOption("Status", Status)}
          />
          <TicketFormSelect
            onChange={(newValue: string) =>
              props.update({ severity: keyToIndex(newValue, Severity) })
            }
            options={mapEnumToSelectOption("Severity", Severity)}
          />
          <TicketFormSelect
            onChange={(newValue: string) =>
              props.update({
                reproducibility: keyToIndex(newValue, Reproducibility),
              })
            }
            options={mapEnumToSelectOption("Reproducibility", Reproducibility)}
          />
          <TicketFormSelect
            onChange={(newValue: string) =>
              props.update({ typeLabel: keyToIndex(newValue, TypeLabel) })
            }
            options={mapEnumToSelectOption("Tag", TypeLabel)}
          />
        </SelectGrid>
        <TextWrapper display={props.displayAuthor}>
          <ThemeProvider theme={theme}>
            <TextField
              className="textSection"
              label="Title"
              rows={1}
              defaultValue={props.defaultTitle}
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.update({ title: event.target.value })
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
                props.update({ description: event.target.value })
              }
            />
            <ImageLinks
              imageLinks={props.defaultLinks}
              onChange={(newLinks: string[]) =>
                props.update({ imageLinks: newLinks })
              }
            />
          </ThemeProvider>
        </TextWrapper>
        {props.injectedNode}
        <EditControls
          showCancel={true}
          cancelCallback={props.close}
          submitCallback={props.submit}
          submitText={props.submitButtonText}
          className="editControls"
        />
      </ContentWrapper>
    </Modal>
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
