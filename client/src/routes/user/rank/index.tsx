import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../flux/slices/userSlice";
import { selectUserRank } from "../../../flux/slices/authSlice";
import { keyToIndex, mapEnumToSelectOption } from "../../../constants/global";
import { Rank } from "../../../constants/user";
import Endpoints from "../../../constants/api";
import {
  WidgetWrapper,
  WidgetHeader,
} from "../../../components/container/widget";
import Icon from "@material-ui/core/Icon";
import Select from "../../../components/input/select";
import EditControls from "../../../components/input/editControls";
import { updateUser } from "../../../flux/slices/userSlice";
import { toast } from "react-toastify";
import styled from "styled-components";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const clientRank = useSelector(selectUserRank);
  const [rank, setRank] = React.useState(user.rank);

  const updateRank = () => {
    const sendErr = () =>
      toast.error(
        "You do not have sufficient permissions to perform this operation."
      );
    if (clientRank >= rank && clientRank > user.rank) {
      // make a post request updating the user's rank.
      // note: we have both client and serverside validation
      fetch(`${Endpoints.UPDATE_USER}/${user.tag}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            op: "replace",
            path: "/Rank",
            value: rank,
          },
        ]),
      }).then((res) => {
        console.log(res);
        if (res.status === 204) {
          toast.success("Successfully updated user's rank.");
          dispatch(updateUser(Object.assign({}, user, { rank: rank })));
        } else sendErr();
      });
    } else {
      sendErr();
    }
  };

  return (
    <Container className="rank">
      <WidgetHeader>
        <Icon>security</Icon>
        <h1>Update Rank</h1>
      </WidgetHeader>
      <SelectWrapper
        children={
          <Select
            fixedWidth={false}
            width={150}
            mobileWidth={115}
            onChange={(newValue: string) => setRank(keyToIndex(newValue, Rank))}
            options={mapEnumToSelectOption("Rank", Rank)}
            value={rank}
          />
        }
      />
      <EditControls
        showCancel={false}
        cancelCallback={() => {}}
        submitCallback={updateRank}
        submitText={"Submit"}
        className="editControls"
      />
    </Container>
  );
};

const Container = styled(WidgetWrapper)`
  max-width: 95vw;
  width: 100%;
  height: 100%;
  justify-content: flex-start;

  .editControls {
    margin-top: 0.5rem;
  }
`;

const SelectWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
`;
