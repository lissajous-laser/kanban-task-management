import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const dropDownMenuSlice = createSlice({
  name: 'dropDownMenu',
  initialState: false,
  reducers: {
    toggleMenu: (state) => !state,
    closeMenu: () => false 
  }
});

export const {toggleMenu, closeMenu} = dropDownMenuSlice.actions;

export default dropDownMenuSlice.reducer;