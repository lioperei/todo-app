import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { ToDoService } from '../to-do.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
  }

  onClickRemove() {
    this.toDoService.removeToDo(this.todo);
    console.log(this);
  }

  onClickComplete() {
    this.todo.complete = !this.todo.complete;
    this.toDoService.completeTodo(this.todo);
  }
}
