import React from "react";
import { Notification } from "../../../app/constants";
import NotificationCell from "../notification";
import IterableWidget from "../iterableWidget";
import styled from "styled-components";

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
        commentVariant: false,
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
