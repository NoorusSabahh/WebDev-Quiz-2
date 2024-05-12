import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  },
});

export const { setProfile } = appSlice.actions;
export default appSlice;
