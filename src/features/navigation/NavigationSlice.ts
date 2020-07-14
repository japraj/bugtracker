import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface NavigationState {
  collapsed: boolean;
}

const initialState: NavigationState = {
  collapsed: true,
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

export const selectCollapsed = (state: RootState) => state.navigation.collapsed;

export default navigationSlice.reducer;
