import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { ToDoService } from '../to-do.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  subscription: Subscription;
  @Input() name: string;
  @Input() complete: boolean;

  todos: Todo[];

  constructor(private newToDoService: ToDoService) { }

  ngOnInit() {
    this.subscription = this.newToDoService.todos$.subscribe(
      (todos) => {
        console.log(this.todos);
        this.todos = todos.filter( (value: Todo) => {
        return value.complete === this.complete;
      })}
    );
  }

  onClickRemove(todo: Todo) {
    this.todos = this.todos.filter((value) => {
      return value !== todo;
    });
  }
}
