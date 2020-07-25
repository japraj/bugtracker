import React from "react";
import Icon from "@material-ui/core/Icon";
import { LinkWrapper, LinkWidget } from "./styles";

export default () => {
  return (
    <LinkWrapper to={"/create"}>
      <LinkWidget>
        <h1>Create a new Issue</h1>
        <Icon className="icon">create</Icon>
      </LinkWidget>
    </LinkWrapper>
  );
};
