import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextfieldButton from "../../input/textfieldButton";
import { Container, ImageLinkSet, ImageLink, EmptyMessage } from "./styles";

// This enum is only used internally within this component
// so it was kept out of the constants file.
enum Action {
  ADD,
  REMOVE,
}

export default (props: {
  onChange: (arg0: string[]) => void;
  imageLinks: string[];
}) => {
  const change = (action: Action, imageLink: string) => {
    if (
      action === Action.REMOVE ||
      (action === Action.ADD &&
        imageLink &&
        props.imageLinks.indexOf(imageLink) === -1)
    ) {
      let newSet = Object.assign([], props.imageLinks);
      action === Action.ADD
        ? newSet.push(imageLink)
        : newSet.splice(newSet.indexOf(imageLink), 1);
      props.onChange(newSet);
    }
  };

  return (
    <Container>
      <ImageLinkSet>
        {props.imageLinks.length > 0 ? (
          props.imageLinks.map((imageLink) => (
            <ImageLink>
              <h1>{imageLink}</h1>
              <IconButton
                className="removeIcon"
                aria-label="remove image link"
                onClick={() => change(Action.REMOVE, imageLink)}
                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                  event.preventDefault()
                }
                edge="end"
              >
                <Icon>close</Icon>
              </IconButton>
            </ImageLink>
          ))
        ) : (
          <EmptyMessage>
            No images linked. You can upload any relevant images to a website
            such as Google Photos, Imgur, or Dropbox and attach the link using
            the textfield below.
          </EmptyMessage>
        )}
      </ImageLinkSet>
      <TextfieldButton
        label="Add a new link"
        labelWidth={105}
        defaultValue=""
        clearInputOnSubmit={true}
        editable={true}
        buttonIconName="add"
        onSubmit={(newLink: string) => change(Action.ADD, newLink)}
        className="textfieldButton"
      />
    </Container>
  );
};
