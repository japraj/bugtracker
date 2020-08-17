import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../flux/slices/userSlice";
import { WidgetWrapper } from "../../../components/container/widget";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { RankObject, getRankObj } from "../../../constants/user";
import styled from "styled-components";

export default () => {
  const user = useSelector(selectUserInfo);
  const rank: RankObject = getRankObj(user.rank);

  return (
    <Container>
      <ProfileCard>
        <Avatar
          src={user.profileImg}
          style={{
            width: "140px",
            height: "140px",
          }}
        />
        <CardBody>
          <h1>{user.tag}</h1>
          <Chip
            style={{
              color: "white",
              backgroundColor: `var(--theme-${rank.badgeColor})`,
            }}
            variant="outlined"
            size="medium"
            label={rank.name}
          />
        </CardBody>
      </ProfileCard>
    </Container>
  );
};

const Container = styled(WidgetWrapper)`
  max-width: 95vw;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
`;

const ProfileCard = styled.div`
  display: column;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CardBody = styled.div`
  padding-right: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    margin: 1rem 0 0.5rem;
    font-size: 1.3rem;
  }
`;
