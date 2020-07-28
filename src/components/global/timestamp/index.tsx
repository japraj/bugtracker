import React from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { PopperContent } from "../userLink/styles";
import "../userLink/Popper.css";
import styled from "styled-components";

const shortenDate = (date: string): string => {
  let shortenedDate = date.substring(2, 5) + "11267";
  // do stuff!
  // if the date is within the past 24 hrs, then we want to return a time like xx:yy p.m. (in the user's local time)
  // else, we want to return something of the form "dd/mm/yyyy"
  return shortenedDate;
};

export default ({ date }: { date: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <ShortDate
        onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) =>
          setAnchorEl(anchorEl === null ? event.currentTarget : null)
        }
        onMouseLeave={() => setAnchorEl(null)}
      >
        {shortenDate(date)}
      </ShortDate>
      <Popper
        style={{ zIndex: 13 }}
        className="popper"
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={50}>
            <PopperContent>
              <FullDate>{date + "4525234524"}</FullDate>
            </PopperContent>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

const FullDate = styled.p`
  color: white;
`;

const ShortDate = styled.h6`
  :hover {
    cursor: pointer;
  }
`;
