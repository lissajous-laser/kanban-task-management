import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChangeBoardAction} from "../lib/types";

const initState = 100;

const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: initState,
  reducers: {
    changeBoard: (state, action: PayloadAction<ChangeBoardAction>) => {
      return action.payload.boardId;
    }
  }
});

export const {changeBoard} = currentBoardSlice.actions;
export default currentBoardSlice.reducer;