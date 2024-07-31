import { configureStore } from "@reduxjs/toolkit";
//step - 4 import the slice
import userDetailReducer from "./slices/userDetail.js";

export const store = configureStore({
  reducer: {
    userDetail: userDetailReducer,
  },
});
