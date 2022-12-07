import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initState = 0;

// A board id of -1 denotes that there Boards[] is empty.
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