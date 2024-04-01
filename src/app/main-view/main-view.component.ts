import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task';
import { ApiService } from '../api.service';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { MainViewMode } from '../main-view-mode';
import { CreateTaskComponent } from '../create-task/create-task.component';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    TaskComponent,
    NgSwitch,
    NgSwitchCase,
    CreateTaskComponent,
    RouterModule,
    TasksListComponent,
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const statistics = this.apiService.getStatistics();
    this.tasksNumber = statistics.tasksNumber;
    this.completedTasksNumber = statistics.completedTasksNumber;
    this.notCompletedTasksNumber = statistics.notCompletedTasksNumber;
  }

  mode: MainViewMode = MainViewMode.INDEX;

  task?: Task = undefined;

  tasksNumber: number = 0;
  completedTasksNumber: number = 0;
  notCompletedTasksNumber: number = 0;

  @Input()
  set taskId(taskId: string | undefined) {
    const statistics = this.apiService.getStatistics();
    this.tasksNumber = statistics.tasksNumber;
    this.completedTasksNumber = statistics.completedTasksNumber;
    this.notCompletedTasksNumber = statistics.notCompletedTasksNumber;

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
