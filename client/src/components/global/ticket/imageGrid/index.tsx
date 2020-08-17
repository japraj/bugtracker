import React from "react";
import { useDispatch } from "react-redux";
import { reportLoadingFailure } from "../../../../flux/slices/ticketSlice";
import styled from "styled-components";
import Image from "../../image";

export default ({ imageLinks }: { imageLinks: string[] }) => {
  const dispatch = useDispatch();
  const imageSet = imageLinks.map((imageLink, index) => (
    <Image
      key={imageLink + index}
      src={imageLink}
      width="250px"
      height="250px"
      hideOnError={true}
      onError={() => dispatch(reportLoadingFailure())}
    />
  ));
  return <ImageGrid>{imageSet}</ImageGrid>;
};

const ImageGrid = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 2rem;
  justify-content: center;
`;
