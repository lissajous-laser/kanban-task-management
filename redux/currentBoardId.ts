import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initState = 0;

const currentBoardIdSlice = createSlice({
  name: 'currentBoardId',
  initialState: initState,
  reducers: {
    changeBoard: (state, action: PayloadAction<number>) =>
      action.payload
  }
});

export const {changeBoard} = currentBoardIdSlice.actions;
export default currentBoardIdSlice.reducer;