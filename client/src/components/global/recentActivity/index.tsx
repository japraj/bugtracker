import React from "react";
import { Notification, Variant } from "../../../constants/notification";
import NotificationCell from "../notification";
import IterableWidget from "../iterableWidget";

// Used in the home route and user route
export default ({
  notificationSet,
  className,
  nodeClassName,
}: {
  notificationSet: Notification[];
  className: string;
  nodeClassName?: string;
}) => {
  return (
    <IterableWidget
      className={className}
      iconName="today"
      title="Activity"
      elementsPerPage={5}
      set={notificationSet}
      wrapperElement={NotificationCell}
      defaultProps={{
        variant: Variant.GLOBAL,
        onClick: () => {},
        className: "",
      }}
      elementPropName="notification"
      wrapInSection={true}
      nodeClassName={nodeClassName}
      emptySetFallback="No activity"
    />
  );
};
