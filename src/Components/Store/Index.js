import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
const store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
  },
});
export default store;
