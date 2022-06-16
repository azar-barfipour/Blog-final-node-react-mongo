import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLoggedIn: false, token: "" },
  reducers: {
    login(state, action) {
      if (action.payload) {
        state.isLoggedIn = true;
        state.token = action.payload;
      }
    },
    logout(state, action) {
      if (!action.payload) {
        state.isLoggedIn = false;
        state.token = "";
      }
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
