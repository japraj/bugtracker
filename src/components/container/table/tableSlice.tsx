import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface TableState {
  selectedIndex: number;
}

const initialState: TableState = {
  selectedIndex: 0,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSelected: {
      reducer(state, action: PayloadAction<number>) {
        state.selectedIndex = action.payload;
      },
      prepare(payload: number) {
        return { payload };
      },
    },
  },
});

export const { setSelected } = tableSlice.actions;

export const selectCurrentIndex = (state: RootState) =>
  state.table.selectedIndex;

export default tableSlice.reducer;
