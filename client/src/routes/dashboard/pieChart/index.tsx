import React from "react";
import { WidgetWrapper } from "../../../components/container/widget";
import { Pie, defaults } from "react-chartjs-2";
import styled from "styled-components";

defaults.global.defaultFontColor = "rgba(255, 255, 255, 0.9)";

export default (props: {
  labels: string[];
  data: number[];
  backgroundColors: string[];
  hoverBackgroundColors: string[];
}) => {
  defaults.global.defaultFontSize = window.innerWidth < 500 ? 15 : 20;
  return (
    <Container
      children={
        <Pie
          data={{
            labels: props.labels,
            datasets: [
              {
                data: props.data,
                backgroundColor: props.backgroundColors,
                hoverBackgroundColor: props.hoverBackgroundColors,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: window.innerWidth < 700 ? "bottom" : "right",
              align: window.innerWidth < 700 ? "center" : "start",
              labels: {
                fontSize: window.innerWidth < 500 ? 20 : 24,
                padding: window.innerWidth < 700 ? 40 : 20,
              },
            },
          }}
        />
      }
    />
  );
};

const Container = styled(WidgetWrapper)`
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 1.5rem 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 475px;
`;
