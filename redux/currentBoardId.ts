import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectBoardAction} from "../lib/types";

const initState = 0;

const currentBoardIdSlice = createSlice({
  name: 'currentBoardId',
  initialState: initState,
  reducers: {
    changeBoard: (state, action: PayloadAction<number>) => {
      return action.payload;
    }
  }
});

export const {changeBoard} = currentBoardIdSlice.actions;
export default currentBoardIdSlice.reducer;