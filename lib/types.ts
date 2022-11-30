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
  description: string,
  isDone: boolean,
}

export type TaskAction = {
  boardId: number,
  columnId: number,
  columnMoveToId?: number,
  task: Task
}
