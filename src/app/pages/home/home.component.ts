import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
