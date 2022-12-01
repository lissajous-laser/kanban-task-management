import {createSlice} from '@reduxjs/toolkit';

const sidebarVisSlice = createSlice({
  name: 'sidebarVis',
  initialState: true,
  reducers: {
    toggleSidebarVis: (state) => !state
  }
})

export const {toggleSidebarVis} = sidebarVisSlice.actions;
export default sidebarVisSlice.reducer;
