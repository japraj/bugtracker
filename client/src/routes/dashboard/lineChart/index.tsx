import React from "react";
import { WidgetWrapper } from "../../../components/container/widget";
import { Line } from "react-chartjs-2";
import { ChartPoint } from "chart.js";
import styled from "styled-components";

export default (props: {
  title: string;
  labels: string[];
  data: ChartPoint[];
}) => (
  <Container
    children={
      <Line
        data={{
          labels: props.labels,
          datasets: [
            {
              label: props.title,
              fill: true,
              lineTension: 0.05,
              backgroundColor: "rgba(32, 158, 145, 0.45)",
              borderColor: "rgba(32, 158, 145, 1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "round",
              pointBorderColor: "rgba(32, 158, 145, 0.7)",
              pointBackgroundColor: "rgba(32, 158, 145, 1)",
              pointBorderWidth: 1,
              pointHoverRadius: 10,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
              data: props.data,
            },
          ],
        }}
        options={{
          maintainAspectRatio:
            window.innerWidth < 1600 && window.innerWidth > 500,
          legend: {
            labels: {
              fontSize: window.innerWidth < 500 ? 20 : 24,
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    }
  />
);

const Container = styled(WidgetWrapper)`
  width: 100%;
  max-width: 100%;
  position: relative;
  padding: 1rem;

  @media (min-width: 1601px) {
    min-height: 70vh;
  }

  @media (max-width: 500px) {
    min-height: 75vh;
  }
`;
