import React from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import { PopperContent } from "../userLink/styles";
import "../userLink/Popper.css";
import styled from "styled-components";

export const getDateFromISO = (dateStr: string): Date => {
  // Main issue with the commented method is that i'm unsure whether subtracting the timezone offset works 100% of the time
  // (or whether we need to add it in some cases)

  // const d: number[] = dateStr.split(/\D/).map((s) => {
  //   try {
  //     return Number(s);
  //   } catch {
  //     return 0;
  //   }
  // });
  // var date: Date = new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
  // date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  // return date;
  return new Date(dateStr + "Z");
};

const formattedDate = (date: string): string =>
  getDateFromISO(date).toLocaleString();

const shortenDate = (dateStr: string): string => {
  // if the date is within the past 24 hrs, then we want to return a time like xx:yy p.m. (in the user's local time)
  // else, we want to return something of the form "dd/mm/yyyy"
  const date: Date = getDateFromISO(dateStr);
  return new Date().getTime() - date.getTime() < 24 * 60 * 60 * 1000
    ? date.toLocaleTimeString().substring(0, 4) +
        date.toLocaleTimeString().substring(7)
    : date.toLocaleDateString();
};

// Dates come in the form '2020-08-11T12:50:59.501876' (ISO 8601 format) in the UTC timezone
export default ({ date, className }: { date: string; className?: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <div className={className === undefined ? "" : className}>
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
              <FullDate>{formattedDate(date)}</FullDate>
            </PopperContent>
          </Fade>
        )}
      </Popper>
    </div>
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
