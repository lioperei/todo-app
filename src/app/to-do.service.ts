import { Injectable } from '@angular/core';
import { Todo } from './todo';
import TodoList from '../assets/todo.json';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private error = new BehaviorSubject<string>('');
  error$ = this.error.asObservable();


  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();


  getToDos() {
    return this.todos;
  }

  sendError(err: string) {
    this.error.next(err);
  }

  addToDo(todo: Todo) {
    const prevTodos = this.todos.value;
    for (const item of prevTodos) {
      if (item.description.toLowerCase() === todo.description.toLowerCase() &&
       item.task.toLowerCase() === todo.task.toLowerCase()) {
        this.error.next('Todo already exists');
        return;
      }
    }
    prevTodos.push(todo);
    this.todos.next(prevTodos);
    this.error.next('');
  }

  completeTodo(todo: Todo) {
    const prevTodos = this.todos.value;
    prevTodos.map((x: Todo) => {
      if (x.description === todo.description && x.task === todo.task && x.complete === false) {
        return Object.assign({}, x, {complete: true});
      } else {
        return x;
      }
    });
    this.todos.next(prevTodos);
  }

  removeToDo(todo: Todo) {
    const prevTodos = this.todos.value;
    let i: number = null;
    prevTodos.forEach((item: Todo, index) => {
      if (item.description === todo.description && item.task === todo.task) {
        i = index;
      }
    });
    if (i != null) {
      prevTodos.splice(i, 1);
      this.todos.next(prevTodos);
    }
  }


  constructor() {
    this.todos.next(TodoList.todo);
  }
}
