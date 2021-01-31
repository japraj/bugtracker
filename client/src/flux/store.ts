import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contextReducer from "./slices/contextSlice";
import navigationReducer from "./slices/navigationSlice";
import homeReducer from "./slices/homeSlice";
import ticketReducer from "./slices/ticketSlice";
import creationReducer from "./slices/creationSlice";
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";
import demoReducer from "./slices/demoSlice";

// All reducers must be declared here!
export const store = configureStore({
  reducer: {
    authentication: authReducer,
    context: contextReducer,
    navigation: navigationReducer,
    home: homeReducer,
    ticket: ticketReducer,
    creation: creationReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    demo: demoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
