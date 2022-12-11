import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: true,
  reducers: {
    toggleDarkMode: (state) => !state,
    setDarkMode: (state, action: PayloadAction<boolean>) =>
      action.payload
  }
});

export const {toggleDarkMode, setDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;