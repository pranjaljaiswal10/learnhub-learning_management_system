import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    userLogin: (state, action) => {
      (state.user = action.payload), (state.isAuthenticated = true);
      state.token = action.payload;
    },
    userLogout: (state, action) => {
      (state.user = action.payload), (state.isAuthenticated = false);
    },
  },
});

export const { userLogIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
