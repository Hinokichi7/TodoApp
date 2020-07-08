export type ToDoItem = {
    id: string;
    // selected: boolean;
    title: string;
    detail: string;
    note: string;
    priority: number;
    deadline: Date;
    createdAt: Date;
    progress: string;
}

export class ToDo {
  /* eslint no-underscore-dangle: [error, {allowAfterThis: true, allowAfterSuper: true}] */
    protected _todoItem: ToDoItem;

    get id() {
      return this._todoItem.id;
    }
    set id(val: string) {
      this._todoItem.id = val;
    }

    // get selected() {
    //   return this._todoItem.selected;
    // }
    // set selected(val: boolean) {
    //   this._todoItem.selected = val;
    // }

    get title() {
      return this._todoItem.title;
    }
    set title(val: string) {
      this._todoItem.title = val;
    }

    get detail() {
      return this._todoItem.detail;
    }
    set detail(val: string) {
      this._todoItem.detail = val;
    }

    get note() {
      return this._todoItem.note;
    }
    set note(val: string) {
      this._todoItem.note = val;
    }

    get priority() {
      return this._todoItem.priority;
    }
    set priority(val: number) {
      this._todoItem.priority = val;
    }


    get deadline() {
      return this._todoItem.deadline;
    }
    set deadline(val: string) {
      this._todoItem.deadline = val;
    }

    get createdAt() {
      return this._todoItem.createdAt;
    }
    set createdAt(val: Date) {
      this._todoItem.createdAt = val;
    }

    get progress() {
      return this._todoItem.progress;
    }
    set progress(val: string) {
      this._todoItem.progress = val;
    }

    constructor(todoItem: ToDoItem) {
      this._todoItem = todoItem;
    }
}
