import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { CollapsedTicket } from "../../constants/ticket";
import { getDateFromISO } from "../../constants/date";
import { ChartPoint } from "chart.js";

export interface DashboardState {
  loaded: boolean;
  infoData: string[];
  statusData: number[];
  severityData: number[];
  lineLabels: string[];
  lineData: ChartPoint[];
}

const initialState: DashboardState = {
  loaded: false,
  infoData: [],
  statusData: [],
  severityData: [],
  lineLabels: [],
  lineData: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<DashboardState>) => {
      state = Object.assign(state, action.payload);
    },
  },
});

// parse data from ContextSlice and store it in the DashboardState
export const loadData = (): AppThunk => (dispatch, getState) => {
  const state: RootState = getState();
  // get Tickets from ContextSlice and sort by date (oldest to newst)
  const tickets: CollapsedTicket[] = state.context.stores.collapsedTickets.allKeys
    .map((key) => state.context.stores.collapsedTickets.byKey[key])
    .sort(
      (t1, t2) =>
        getDateFromISO(t1.creationDate).getTime() -
        getDateFromISO(t2.creationDate).getTime()
    );
  const resolved: number = tickets.filter((t) => t.status === 2).length;
  const wip: number = tickets.filter((t) => t.status === 1).length;
  const unassigned: number = tickets.filter((t) => t.status === 0).length;

  var labels: string[] = [];
  var dataSet: {
    [label: string]: number;
  } = {};

  tickets.forEach((t) => {
    const date: string = getDateFromISO(t.creationDate).toDateString();
    if (labels.indexOf(date) === -1) {
      labels.push(date);
      dataSet[date] = 1;
    } else {
      dataSet[date] = dataSet[date] + 1;
    }
  });

  dispatch(
    homeSlice.actions.storeData({
      loaded: true,
      infoData: [
        tickets.length.toString(),
        resolved.toString(),
        wip.toString(),
        unassigned.toString(),
      ],
      statusData: [resolved, wip, unassigned],
      severityData: [
        tickets.filter((t) => t.severity === 2).length,
        tickets.filter((t) => t.severity === 1).length,
        tickets.filter((t) => t.severity === 0).length,
      ],
      lineLabels: Object.keys(dataSet).map((key: string) =>
        new Date(key).toLocaleString()
      ),
      // .map((date) =>  date.substring(3, date.length - 5)),
      lineData: Object.keys(dataSet).map((key: string) => {
        return {
          t: new Date(key),
          y: dataSet[key],
        };
      }),
    })
  );
};

export const selectDashboardSlice = (state: RootState): DashboardState =>
  state.dashboard;

export default homeSlice.reducer;
