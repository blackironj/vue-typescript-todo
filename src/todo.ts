const STORAGE_KEY = "vue-typescript-todo";

export enum TodoStatus {
  COMPLETE,
  INCOMPLETE,
  DEFAULT
}

export interface TodoStruct {
  text: string;
  status: TodoStatus;
}

export default class TodoStorage {
  public fetch(): Array<TodoStruct> {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

  public save(todos: Array<TodoStruct>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
