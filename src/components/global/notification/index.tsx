import React from "react";
import UserLink from "../userLink";
import HyperLink from "../hyperLink";
import { Notification } from "../../../app/flux/slices/authSlice";
import { Cell, CellText } from "./styles";

export default ({
  notification,
  className,
  onRedirect,
}: {
  notification: Notification;
  className: string;
  onRedirect: () => void;
}) => {
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
          want to close the notifications modal when the user is redirected
          for a smooth ux.
          */}
        <HyperLink className="link" to={notification.to} onClick={onRedirect}>
          {notification.message}
        </HyperLink>
      </CellText>
    </Cell>
  );
};
