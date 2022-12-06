import {configureStore} from '@reduxjs/toolkit';
import boardsReducer from './boards';
import currentBoardReducer from './currentBoardId';
import sidebarVisReducer from './sidebarVis';
import modalWinReducer from './modalWin';
import dropDownMenuReducer from './dropDownMenu';
import dropDownMenu from './dropDownMenu';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    currentBoardId: currentBoardReducer,
    sidebarVis: sidebarVisReducer,
    modalWin: modalWinReducer,
    dropDownMenu: dropDownMenuReducer
  }
})