import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    Authdata: [],
    isAuth: localStorage.getItem("token") || false,
  },
  reducers: {
    Login: (state) => {
      state.isAuth = true;
      // console.log(state.isAuth);
    },
    Logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    Signup: (state, action) => {
      state.Authdata = action.payload;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;
