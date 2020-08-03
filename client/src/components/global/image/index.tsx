import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

interface Props {
  src: string;
  width: string;
  height: string;
  onError: () => void;
  hideOnError: boolean;
}

// Note: if an image has an error in its loading
// and the image recieved the "hideOnError" prop,
// then it will automatically be hidden instead
// of displaying an alt tag

export default (props: Props) => {
  const [errored, setErrored] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const ImageNode = (styledProps: StyledProps) => (
    <ImageWrapper
      style={{
        display: props.hideOnError && errored ? "none" : "block",
        padding: errored ? "10%" : "0",
      }}
      onClick={() => (errored ? {} : setZoomed(!zoomed))}
      width={styledProps.width}
      height={styledProps.height}
    >
      <Image
        src={props.src}
        alt={`See ${props.src}`}
        onError={() => {
          if (!errored) {
            props.onError();
            setErrored(true);
          }
        }}
      />
    </ImageWrapper>
  );

  return (
    <React.Fragment>
      <ImageNode width={props.width} height={props.height} />
      <Modal
        disableScrollLock={false}
        style={{ zIndex: 15 }}
        open={zoomed}
        onClose={() => setZoomed(false)}
        aria-labelledby="Issue Display"
        aria-describedby="An issue and its details."
      >
        <ZoomedImage onClick={() => setZoomed(false)}>
          <ImageNode width={"90vw"} height={"90vh"} />
        </ZoomedImage>
      </Modal>
    </React.Fragment>
  );
};

interface StyledProps {
  width: string;
  height: string;
}

const Image = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  color: var(--text-color);
  max-width: 100%;
  max-height: 100%;
  white-space: normal;
  word-break: break-all;
`;

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: ${(props: StyledProps) => props.width};
  display: flex;
  justify-content: center;
  height: ${(props: StyledProps) => props.height};
`;

const ZoomedImage = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 5vh 5vw;
`;
