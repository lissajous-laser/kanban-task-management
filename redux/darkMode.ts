import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: true,
  reducers: {
    toggleDarkMode: (state) => !state,
  }
});

export const {toggleDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;