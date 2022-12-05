import {bindActionCreators, createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit';
import {Board, Column, Task, TaskAction} from '../lib/types';
import data from '../public/data.json'

// Starting number for serial id in sample data.
let currentId = 0;

const initFile: Board[] = data.boards.map((board) => {
  
  return {
    id: currentId++,
    name: board.name,
    columns: board.columns.map((column) => ({
      id: currentId++,
      name: column.name,
      tasks: column.tasks.map((task) => ({
        id: currentId++,
        title: task.title,
        description: task.description,
        subtasks: task.subtasks.map((subtask) => ({
          id: currentId++,
          title: subtask.title,
          isCompleted: subtask.isCompleted
        })) 
      }))
    }))
  }
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initFile,
  reducers: {
    importBoards: (state, action: PayloadAction<Board[]>) => {
      return action.payload;
    },

    addBoard: (state, action: PayloadAction<Board>) => {
      return [...state, action.payload];
    },

    editBoard: (state, action: PayloadAction<Board>) => {
      return [...state.map((board) =>
          board.id === action.payload.id
          ? action.payload
          : board
      )];
    },

    deleteBoard: (state, action: PayloadAction<number>) => {
      return [...state.filter((board) => board.id !== action.payload)];
    },

    addTask: (state, action: PayloadAction<TaskAction>) => {
      return [...state.map((board) =>
        board.id === action.payload.boardId
        ? {
          id: board.id,
          name: board.name,
          columns: board.columns.map((column) =>
            column.id === action.payload.columnSelected
            ? {
              id: column.id,
              name: column.name,
              tasks: [...column.tasks, action.payload.task]
            }
            : column
          )
        }
        : board
      )]
    },

    editTask: (state, action : PayloadAction<TaskAction>) => {
        return state.map((board) =>
          board.id === action.payload.boardId
          ? {
            id: board.id,
            name: board.name,
            columns: board.columns.map((column) =>
              column.id !== action.payload.columnSelected
              ? {
                id: column.id,
                name: column.name,
                tasks: column.tasks.filter((task) =>
                  task.id !== action.payload.task.id)
              }
              : column.id === action.payload.columnSelected
              ? {
                id: column.id,
                name: column.name,
                tasks: [
                  ...column.tasks.filter((task) =>
                    task.id !== action.payload.task.id),
                  action.payload.task
                ]
              }
              : column
            )
          }
          : board
        )
    },

    deleteTask: (state, action: PayloadAction<TaskAction>) => {
      return state.map((board) => 
        board.id === action.payload.boardId
        ? {
          id: board.id,
          name: board.name,
          columns: board.columns.map((column) => ({
            id: column.id,
            name: column.name,
            tasks: column.tasks.filter((task) =>
              task.id !== action.payload.task.id)
          }))
        }
        : board
      )
    }
  }  
});

export const {
  importBoards, addBoard, editBoard, deleteBoard,
  addTask, editTask, deleteTask
} = boardsSlice.actions;

export default boardsSlice.reducer;