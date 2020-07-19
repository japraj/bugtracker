import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../components/global/navigation/navigationSlice";
import authReducer from "./flux/auth/authSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    authentication: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
