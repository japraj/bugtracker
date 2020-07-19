import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./flux/counter/counterSlice";
import navigationReducer from "../components/global/navigation/navigationSlice";
import authReducer from "./flux/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
