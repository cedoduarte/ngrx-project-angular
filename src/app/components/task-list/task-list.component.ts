import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, markTaskAsCompleted, removeTask, selectTaskList } from '../../store/task.store';
import { v4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  store = inject(Store);
  taskList = this.store.selectSignal(selectTaskList);
  newTaskTitle = "";
  newTaskIsCompleted = false;

  handleAddNewTask() {
    if (this.newTaskTitle === "") {
      return;
    }
    this.store.dispatch(addTask({
      id: v4(),
      title: this.newTaskTitle,
      isCompleted: this.newTaskIsCompleted
    }));
  }

  handleInitialIsCompleted(event: any) {
    const isChecked = event.target.checked;
    this.newTaskIsCompleted = isChecked;
  }

  handleIsCompleted(event: any, taskId: string) {
    const isChecked = event.target.checked;
    const selectedTask = this.taskList().filter(item => item.id === taskId);
    this.store.dispatch(markTaskAsCompleted({
      task: selectedTask[0],
      completed: isChecked
    }));
  }

  handleRemoveTask(event: any, taskId: string) {
    const selectedTask = this.taskList().filter(item => item.id === taskId);
    this.store.dispatch(removeTask(selectedTask[0]));
  }
}
