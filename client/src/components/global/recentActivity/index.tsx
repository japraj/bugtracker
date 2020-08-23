import React from "react";
import { Notification, Variant } from "../../../constants/notification";
import NotificationCell from "../notification";
import IterableWidget from "../iterableWidget";

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
      title="Recent Activity"
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
      emptySetFallback="No recent activity"
    />
  );
};
