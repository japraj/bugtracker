import React from "react";
import { toggleDisplay } from "../../../app/flux/slices/creationSlice";
import { selectUser } from "../../../app/flux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import history from "../../history";
import Icon from "@material-ui/core/Icon";
import CreationModal from "../../../components/global/creationModal";
import { LinkWrapper, LinkWidget } from "./styles";

export default () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectUser).authenticated;

  return (
    <React.Fragment>
      <LinkWrapper
        onClick={() =>
          authenticated
            ? dispatch(toggleDisplay())
            : history.push("/loginRequired")
        }
      >
        <LinkWidget>
          <h1>Create a new Issue</h1>
          <Icon className="icon">create</Icon>
        </LinkWidget>
      </LinkWrapper>
      <CreationModal />
    </React.Fragment>
  );
};
