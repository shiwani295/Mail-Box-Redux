import { createSlice } from "@reduxjs/toolkit";

const initialModelSliceState = {
  sendData: [],
  reciverData: [],
  ToReciverData: [],
  totalinboxmessage: 0,
  read: "",
  changeData: [],
};

const ModelMailSlice = createSlice({
  name: "modelMail",
  initialState: initialModelSliceState,
  reducers: {
    ToSendData: (state, action) => {
      state.sendData = action.payload;
      console.log(action.payload);
      console.log(state.sendData);
    },
    ToReciverData: (state, action) => {
      //Inbox data
      state.ToReciverData = action.payload;
      console.log(action.payload);
    },
    getData: (state, action) => {
      //login user data (send data || sendbox)
      state.reciverData = action.payload;
      console.log(action.payload);
      state.totalinboxmessage = state.reciverData.length;
      // console.log(state.totalinboxmessage);
    },
    changeData: (state, action) => {
      state.changeData = action.payload;
      console.log(action.payload);
    },
    readMail(state, action) {
      console.log(action.payload);
      // action.payload.map((item) => {
      //   console.log(item);
      //   if (item.read === false) {
      //     state.read = item.read;
      //   }
      //   if (item.read === true) {
      //     state.read = item.read;
      //   }
      // });
    },
  },
});
export const ToSendDataAction = ModelMailSlice.actions;
export const getDataAction = ModelMailSlice.actions;
export const ToReciverDataAction = ModelMailSlice.actions;
export const changeDataAction = ModelMailSlice.actions;
export const readMailAction = ModelMailSlice.actions;
export default ModelMailSlice.reducer;
