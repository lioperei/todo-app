import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToDoService } from '../to-do.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  error = '';

  addToDoForm = this.fb.group({
    task: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private toDoService: ToDoService) { }

  ngOnInit() {
    this.subscription = this.toDoService.error$.subscribe(error => this.error = error);
  }

  onKeyUp() {
    this.error = '';
    console.log('up');
  }

  onClickAdd() {
    this.toDoService.addToDo({ ...this.addToDoForm.value, complete: false });
    this.addToDoForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
