import {configureStore} from '@reduxjs/toolkit';
import boardsReducer from './boards';
import currentBoardReducer from './currentBoardId';
import sidebarVisReducer from './sidebarVis';
import modalWinReducer from './modalWin';
import dropDownMenuReducer from './dropDownMenu';
import darkModeReducer from './darkMode';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    currentBoardId: currentBoardReducer,
    sidebarVis: sidebarVisReducer,
    modalWin: modalWinReducer,
    dropDownMenu: dropDownMenuReducer,
    darkMode: darkModeReducer
  }
})