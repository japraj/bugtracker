import React from "react";
import UserLink from "../userLink";
import { useDispatch } from "react-redux";
import { loadTicketById } from "../../../app/flux/slices/ticketSlice";
import { Notification } from "../../../app/constants";
import { Cell, CellText } from "./styles";

export default ({
  notification,
  className,
  onClick,
}: {
  notification: Notification;
  className: string;
  onClick: () => void;
}) => {
  const dispatch = useDispatch();
  return (
    <Cell className={className}>
      <UserLink
        styleConfig={{
          className: "",
          showImg: true,
          imgLength: `${window.innerWidth > 1100 ? 50 : 40}px`,
          internalSpacing: "0",
          showTag: false,
          tagSize: "0",
        }}
        userInfo={notification.author}
      />
      <CellText>
        <UserLink
          styleConfig={{
            className: "author",
            showImg: false,
            imgLength: "0",
            internalSpacing: "0",
            showTag: true,
            tagSize: "1rem",
          }}
          userInfo={notification.author}
        />
        {/* 
          OnRedirect is a function called when the user clicks the link
          example usage: in the Navigation/Notifications component, we
          want to close the notifications modal when the user clicks
          for a smooth ux.
          */}
        <h5
          onClick={() => {
            dispatch(loadTicketById(notification.ticketId));
            onClick();
          }}
        >
          {notification.message}
        </h5>
      </CellText>
    </Cell>
  );
};
