import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { taskCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import { redirect } from 'next/dist/server/api-utils';
import { Board, Task } from '../lib/types';
import { ShowModalWinAction } from '../lib/types';

const initState: ShowModalWinAction = {
  mode: 'inactive',
  data: {}
};


const modalWinSlice = createSlice({
  name: 'modalWin',
  initialState: initState,
  reducers: {
    // No data required because it is being added to Board[]
    addBoard: (state, action) => ({
      mode: 'add',
      data: {}
    }),
    editBoard: (state, action: PayloadAction<Board>) => ({
      mode: 'edit',
      data: action.payload
    }),
    deleteBoard: (state, action: PayloadAction<Board>) => ({
      mode: 'delete',
      data: action.payload
    }),
    // For adding a task, it is being added TO the Board in
    // the payload.
    addTask: (state, action: PayloadAction<Task>) => ({
      mode: 'add',
      data: action.payload
    }),
    editTask: (state, action: PayloadAction<Task>) => ({
      mode: 'edit',
      data: action.payload
    }),
    deleteTask: (state, action: PayloadAction<Task>) => ({
      mode: 'delete',
      data: action.payload
    }),
    viewTask: (state, action: PayloadAction<Task>) => ({
      mode: 'view',
      data: action.payload
    }),
    closeModalWin: (state) => ({
      mode: 'inactive',
      data: {}
    })
  }
});

export const {
  addBoard, editBoard, deleteBoard, addTask,
  editTask, deleteTask, viewTask, closeModalWin
} = modalWinSlice.actions;

export default modalWinSlice.reducer;