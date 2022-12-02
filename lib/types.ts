import { store } from "../redux/store";

export type Board = {
  id: number,
  name: string,
  columns: Column[]
}

export type Column = {
  id: number,
  name: string,
  tasks: Task[],
}

export type Task = {
  id: number,
  title: string,
  description: string,
  subtasks: Subtask[];
}

export type Subtask = {
  title: string,
  isCompleted: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type TaskAction = {
  boardId: number,
  columnId: number,
  columnMoveToId?: number,
  task: Task
}

export type SelectBoardAction = {
  boardId: number,
}

type Mode = 'add' | 'edit' | 'delete' | 'view' | 'inactive';

export type ShowModalWinAction = {
  mode: Mode,
  data: {} | Board | Task
};