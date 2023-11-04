import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
//import goalSlice from "../features/goals/goalSlice";
export const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
