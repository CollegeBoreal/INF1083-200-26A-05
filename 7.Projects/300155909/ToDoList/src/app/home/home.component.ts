
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  NativeScriptFormsModule
} from '@nativescript/angular';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeComponent {

  tasks: Task[] = [];

  newTask: string = '';

  addTask(): void {
    const title = this.newTask.trim();

    if (!title) {
      return;
    }

    this.tasks.push({
      title: title,
      completed: false
    });

    this.newTask = '';
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get remainingTasks(): number {
    return this.tasks.length - this.completedTasks;
  }
}
