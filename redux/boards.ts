import {bindActionCreators, createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit';
import {Board, Column, Task, TaskAction} from '../lib/types';


const column1: Column = {
  id: 10,
  name: 'todo',
  tasks: [
    {
      id: 0,
      title: 'Build UI for search',
      description: 'Lorem ipsum dolor sit amet',
      subtasks: [
        {
          description: 'consectetur adipiscing elit',
          isDone: false
        }
      ],
    }
  ]
}

const column2: Column =     {
  id: 11,
  name: 'doing',
  tasks: [
    {
      id: 1,
      title: 'Design onboarding flow',
      description: 'Lorem ipsum dolor sit amet',
      subtasks: [
        {
          description: 'consectetur adipiscing elit',
          isDone: true,
        },
        {
          description: 'consectetur adipiscing elit',
          isDone: false,            
        }
      ],
    }
  ],
}

const board1: Board = {
  id: 100,
  name: 'Platform Launch',
  columns: [column1, column2]
}

const initState: Board[] = [board1];


export const boardsSlice = createSlice({
  name: 'boards',
  initialState: initState,
  reducers: {
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
            column.id === action.payload.columnId
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
      if (action.payload.columnMoveToId === undefined) {
        return [...state.map((board) =>
          board.id === action.payload.boardId
          ? {
            id: board.id,
            name: board.name,
            columns: board.columns.map((column) =>
              column.id === action.payload.columnId
              ? {
                id: column.id,
                name: column.name,
                tasks: [...column.tasks.map((task) =>
                  task.id === action.payload.task.id
                  ? action.payload.task
                  : task)]
              }
              : column
            )
          }
          : board
        )]
      } else {
        return [...state.map((board) =>
          board.id === action.payload.boardId
          ? {
            id: board.id,
            name: board.name,
            columns: board.columns.map((column) =>
              column.id === action.payload.columnId
              ? {
                id: column.id,
                name: column.name,
                tasks: [...column.tasks.filter((task) =>
                  task.id !== action.payload.task.id)]
              }
              : column.id === action.payload.columnMoveToId
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
      }
    },

    deleteTask: (state, action: PayloadAction<TaskAction>) => {
      return [...state.map((board) => 
        board.id === action.payload.boardId
        ? {
          id: board.id,
          name: board.name,
          columns: board.columns.map((column) => 
            column.id === action.payload.columnId
            ? {
              id: column.id,
              name: column.name,
              tasks: [...column.tasks.filter((task) =>
                task.id !== action.payload.task.id)]
            }
            : column
          )
        }
        : board
      )]
    }
  }  
});



