import React from "react";
import { WidgetWrapper } from "../../../components/container/widget";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

export default (props: { title: string; data: string; iconName: string }) => {
  return (
    <Container>
      <InfoIcon children={props.iconName} />
      <Info>
        <h1>{props.title}</h1>
        <h2>{props.data}</h2>
      </Info>
    </Container>
  );
};

const Container = styled(WidgetWrapper)`
  width: 100%;
  height: 114px;
  padding: 1rem 2rem 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    display: inline-block;
    font-size: 1.25rem;
    font-weight: bold;
    opacity: 0.9;

    @media (max-width: 1583px) and (min-width: 1320px) {
      font-size: 1rem;
    }

    @media (max-width: 705px) and (min-width: 600px) {
      font-size: 1rem;
    }

    @media (max-width: 350px) {
      font-size: 1rem;
    }
  }

  h2 {
    width: 100%;
    margin: 0.5rem 0 0 1.5rem;
    text-align: left;
    font-size: 1.5rem;

    @media (max-width: 1583px) and (min-width: 1320px) {
      font-size: 1.25rem;
    }

    @media (max-width: 705px) and (min-width: 600px) {
      font-size: 1.25rem;
    }

    @media (max-width: 350px) {
      font-size: 1.25rem;
    }
  }
`;

const InfoIcon = styled(Icon)`
  margin-right: 1.5rem;
  font-size: 4rem !important;
  width: 80px;
  height: 80px;
  opacity: 70%;

  @media (max-width: 1440px) and (min-width: 1320px) {
    font-size: 3rem !important;
    margin-right: 0.6rem;
  }

  @media (max-width: 705px) and (min-width: 600px) {
    font-size: 3rem !important;
    margin-right: 0.6rem;
  }

  @media (max-width: 350px) {
    font-size: 3rem !important;
    margin-right: 0.6rem;
  }
`;
