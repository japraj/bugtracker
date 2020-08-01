import React from "react";
import { Notification } from "../../../app/constants";
import NotificationCell from "../notification";
import IterableWidget from "../iterableWidget";

export default ({
  notificationSet,
  className,
}: {
  notificationSet: Notification[];
  className: string;
}) => {
  return (
    <IterableWidget
      className={className}
      iconName="today"
      title="Recent Activity"
      elementsPerPage={5}
      set={notificationSet}
      wrapperElement={NotificationCell}
      defaultProps={{
        commentVariant: false,
        onClick: () => {},
        className: "",
      }}
      elementPropName="notification"
      wrapInSection={false}
    />
  );
};
