import {configureStore} from '@reduxjs/toolkit';
import boardsReducer from './boards';
import currentBoardReducer from './currentBoardId';
import sidebarVisReducer from './sidebarVis';
import modalWinReducer from './modalWin';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    currentBoardId: currentBoardReducer,
    sidebarVis: sidebarVisReducer,
    modalWin: modalWinReducer
  }
})