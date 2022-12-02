import {configureStore} from '@reduxjs/toolkit';
import boardsReducer from './boards';
import currentBoardReducer from './currentBoard';
import sidebarVisReducer from './sidebarVis';
import modalWinReducer from './modalWin';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    currentBoard: currentBoardReducer,
    sidebarVis: sidebarVisReducer,
    modalWin: modalWinReducer
  }
})