import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task';
import { ApiService } from '../api.service';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { MainViewMode } from '../main-view-mode';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [TaskComponent, NgSwitch, NgSwitchCase, CreateTaskComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent {
  constructor(private apiService: ApiService) {}

  mode: MainViewMode = MainViewMode.INDEX;

  task?: Task = undefined;

  @Input()
  set taskId(taskId: string | undefined) {
    if (taskId === MainViewMode.CREATE) {
      this.mode = MainViewMode.CREATE;
    } else {
      this.mode = taskId ? MainViewMode.TASK : MainViewMode.INDEX;
      const taskIdNumber = taskId ? Number(taskId) : undefined;
      if (taskIdNumber) {
        this.task = this.apiService.getTask(taskIdNumber);
      }
    }
  }
}
