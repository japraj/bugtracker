import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const collapsedWidth: number = 53;
export const extendedWidth: number = 175;

interface NavigationState {
  collapsed: boolean;
}

const initialState: NavigationState = {
  collapsed: window.innerWidth < 1100 ? true : false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { toggleCollapse } = navigationSlice.actions;

export const selectCollapsed = (state: RootState): boolean =>
  state.navigation.collapsed;

export const selectSideNavWidth = (state: RootState): number =>
  state.navigation.collapsed ? collapsedWidth : extendedWidth;

export default navigationSlice.reducer;