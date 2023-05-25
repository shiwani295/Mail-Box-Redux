import { createSlice } from "@reduxjs/toolkit";

const initialModelSliceState = {
  sendData: [],
  reciverData: [],
  totalinboxmessage: 0,
};

const ModelMailSlice = createSlice({
  name: "modelMail",
  initialState: initialModelSliceState,
  reducers: {
    ToSendData: (state, action) => {
      const newEmail = action.payload;
      state.sendData.push({
        id: Math.random().toString(),
        from: newEmail.from,
        to: newEmail.to,
        subject: newEmail.subject,
        content: newEmail.msgBody,
        date: newEmail.date,
      });
    },
    getData: (state, action) => {
      state.reciverData = action.payload;
      state.totalinboxmessage = state.reciverData.length;

      console.log(state.reciverData);
    },
  },
});
export const ToSendDataAction = ModelMailSlice.actions;
export const getDataAction = ModelMailSlice.actions;
export default ModelMailSlice.reducer;
