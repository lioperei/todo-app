import { Component } from '@angular/core';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private newToDoService: ToDoService) {}

  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('drop');
  }
}
