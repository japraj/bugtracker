import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../app/flux/slices/userSlice";
import { WidgetWrapper } from "../../../components/container/widget";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { UserRank, UserRankColors } from "../../../app/constants";
import styled from "styled-components";

export default () => {
  const user = useSelector(selectUserInfo);

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
              backgroundColor: `var(--theme-${UserRankColors[user.rank]})`,
            }}
            variant="outlined"
            size="medium"
            label={UserRank[user.rank]}
          />
        </CardBody>
      </ProfileCard>
    </Container>
  );
};

const Container = styled(WidgetWrapper)`
  max-width: 95vw;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const ProfileCard = styled.div`
  display: flex;
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
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;
