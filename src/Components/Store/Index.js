import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
import ModelMailSliceReducer from "./ModelMailSlice";
const store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
    Mail: ModelMailSliceReducer,
  },
});
export default store;
