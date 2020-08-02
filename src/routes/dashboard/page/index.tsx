import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadData,
  selectDashboardSlice,
} from "../../../app/flux/slices/dashboardSlice";
import InfoWidget from "../infoWidget";
import PieChart from "../pieChart";
import LineChart from "../lineChart";
import Loading from "../../../components/global/loadingRing/LoadingRing";
import {
  Container,
  InfoContainer,
  PieChartContainer,
  LineChartContainer,
  LoadingWrapper,
} from "./styles";

export default () => {
  const dispatch = useDispatch();
  const dashboardSlice = useSelector(selectDashboardSlice);
  if (!dashboardSlice.loaded) dispatch(loadData());

  return dashboardSlice.loaded ? (
    <Container>
      <InfoContainer>
        <InfoWidget
          title="Total Issues"
          data={dashboardSlice.infoData[0]}
          iconName="confirmation_number"
        />
        <InfoWidget
          title="Resolved Issues"
          data={dashboardSlice.infoData[1]}
          iconName="check_circle"
        />
        <InfoWidget
          title="Work-in-progress"
          data={dashboardSlice.infoData[2]}
          iconName="cached"
        />
        <InfoWidget
          title="Unassigned Issues"
          data={dashboardSlice.infoData[3]}
          iconName="assignment_late"
        />
      </InfoContainer>
      <PieChartContainer>
        <PieChart
          labels={["Resolved", "Assigned", "Unassigned"]}
          data={dashboardSlice.statusData}
          backgroundColors={["#90b900", "#209e91", "#e85656"]}
          hoverBackgroundColors={[
            "rgb(200, 255, 0)",
            "rgb(45, 172, 209)",
            "rgb(232, 86, 86)",
          ]}
        />
        <PieChart
          labels={["Major", "Minor", "Trivial"]}
          data={dashboardSlice.severityData}
          backgroundColors={["#005562", "#0e8174", "#6eba8c"]}
          hoverBackgroundColors={["#209e91", "#209e91", "#209e91"]}
        />
      </PieChartContainer>
      <LineChartContainer
        children={
          <LineChart
            title="Issues over Time"
            labels={dashboardSlice.lineLabels}
            data={dashboardSlice.lineData}
          />
        }
      />
    </Container>
  ) : (
    <LoadingWrapper children={<Loading />} />
  );
};
