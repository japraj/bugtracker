import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../flux/slices/userSlice";
import { selectUserRank } from "../../../flux/slices/authSlice";
import { keyToIndex, mapEnumToSelectOption } from "../../../constants/global";
import { Rank } from "../../../constants/user";
import {
  WidgetWrapper,
  WidgetHeader,
} from "../../../components/container/widget";
import Icon from "@material-ui/core/Icon";
import Select from "../../../components/input/select";
import EditControls from "../../../components/input/editControls";
import { toast } from "react-toastify";
import styled from "styled-components";
import API from "../../../api";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const clientRank = useSelector(selectUserRank);
  const [rank, setRank] = React.useState(user.rank);

  const updateRank = () => {
    if (clientRank >= rank && clientRank > user.rank)
      dispatch(API.updateUserRank(rank));
    else
      toast.error(
        "You do not have sufficient permissions to perform this operation."
      );
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
