import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { redirect } from 'next/dist/server/api-utils';
import { Board, Task } from '../lib/types';


type work = 'add' | 'edit' | 'delete' | 'view' | '';

type WinData = {
  work: work,
  data: {} | Board | Task
};



const initState: WinData = {
  work: '',
  data: {}
};


const modalWinSlice = createSlice({
  name: 'modalWin',
  initialState: initState,
  reducers: {
    addBoard: (state) => ({
      work: 'add',
      data: {}
    }),
    editBoard: (state, action: PayloadAction<Board>) => ({
      work: 'edit',
      data: action.payload
    }),
    deleteBoard: (state, action: PayloadAction<Board>) => ({
      work: 'delete',
      data: action.payload
    }),
    addTask: (state) => ({
      work: 'add',
      data: {}
    }),
    editTask: (state, action: PayloadAction<Task>) => ({
      work: 'edit',
      data: action.payload
    }),
    deleteTask: (state, action: PayloadAction<Task>) => ({
      work: 'delete',
      data: action.payload
    }),
    viewTask: (state, action: PayloadAction<Task>) => ({
      work: 'view',
      data: action.payload
    }),
    closeModalWin: (state) => ({
      work: '',
      data: {}
    })
  }
});