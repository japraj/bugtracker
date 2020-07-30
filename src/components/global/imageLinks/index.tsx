import React from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextfieldButton from "../../input/textfieldButton";
import styled from "styled-components";

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
      <ImageLinks>
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
      </ImageLinks>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .textfieldButton {
    margin: 1rem auto;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ImageLinks = styled.div`
  padding: 9.25px 7px 9.25px 14px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.23);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
`;

const ImageLink = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);

  h1 {
    font-size: 1rem;
    text-align: left;
    width: calc(100% - 1rem - 48px);
    margin-right: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.15;
  }

  :first-child {
    padding-top: 0;
  }

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const EmptyMessage = styled.h1`
  font-size: 1rem;
  line-height: 1.5;
  padding: 9.25px 7px 9.25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-style: italic;
`;
