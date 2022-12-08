import {createSlice} from '@reduxjs/toolkit';

const sidebarVisSlice = createSlice({
  name: 'sidebarVis',
  initialState: true,
  reducers: {
    hideSidebar: () => false,
    showSidebar: () => true,
  }
})

export const {hideSidebar, showSidebar} = sidebarVisSlice.actions;
export default sidebarVisSlice.reducer;
