import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import authReducer from "./slices/authSlice";
import tableReducer from "./slices/tableSlice";
import homeReducer from "./slices/homeSlice";
import ticketReducer from "./slices/ticketSlice";

// All reducers must be declared here!
export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    authentication: authReducer,
    table: tableReducer,
    home: homeReducer,
    ticket: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
