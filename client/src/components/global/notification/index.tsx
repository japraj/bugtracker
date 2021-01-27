import React from "react";
import UserLink from "../userLink";
import { useDispatch } from "react-redux";
import API from "../../../api";
import {
  Notification,
  Variant,
  generateGlobalMessage,
  generateModalMessage,
} from "../../../constants/notification";
import { Cell, CellText } from "./styles";
import Timestamp from "../timestamp";

// Note: if comment variant is enabled, then two changes will be applied:
// 1) the linking functionality will be disabled, meaning that clicking on
//    a comment notification's description will not do anything
// 2) text-overflow will not be hidden, meaning that long comments can be
//    read without issue!
export default ({
  notification,
  className,
  onClick,
  variant,
  enableCommentVariant,
}: {
  notification: Notification;
  className: string;
  onClick: () => void;
  variant: Variant;
  enableCommentVariant?: boolean;
}) => {
  const dispatch = useDispatch();
  const imgLength: string = `${window.innerWidth > 1100 ? 50 : 40}px`;
  const commentStyling: boolean =
    Boolean(enableCommentVariant) && notification.message === 2;
  var isValidId: boolean = true;
  try {
    isValidId = Number(notification.ticketId) !== -1;
  } catch {}

  const generateMessage = (): string => {
    switch (variant) {
      case Variant.MODAL:
        return generateModalMessage(notification);
      case Variant.GLOBAL:
      default:
        return generateGlobalMessage(notification);
    }
  };

  return (
    <Cell className={className} commentVariant={commentStyling}>
      <UserLink
        styleConfig={{
          className: "",
          showImg: true,
          imgLength: imgLength,
          internalSpacing: "0",
          showTag: false,
          tagSize: "0",
        }}
        userTag={notification.author}
      />
      <CellText commentVariant={commentStyling}>
        <UserLink
          styleConfig={{
            className: "author",
            showImg: false,
            imgLength: "0",
            internalSpacing: "0",
            showTag: true,
            tagSize: "1rem",
          }}
          userTag={notification.author}
          onRedirect={() => onClick()}
        />
        {/* 
          OnClick is a function called when the user clicks the link
          example usage: in the Navigation/Notifications component, we
          want to close the notifications modal when the user clicks
          for a smooth ux.
          */}
        <h5
          className={!isValidId ? "disableHoverFx" : ""}
          onClick={() => {
            if (variant !== Variant.MODAL && isValidId) {
              dispatch(API.loadTicketById(notification.ticketId));
              onClick();
            }
          }}
        >
          {generateMessage()}
        </h5>
        <Timestamp date={notification.date} />
      </CellText>
    </Cell>
  );
};
