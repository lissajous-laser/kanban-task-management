import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectBoardAction} from "../lib/types";

const initState = 0;

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: initState,
  reducers: {
    changeBoard: (state, action: PayloadAction<number>) => {
      return action.payload;
    }
  }
});

export const {changeBoard} = currentBoardSlice.actions;
export default currentBoardSlice.reducer;