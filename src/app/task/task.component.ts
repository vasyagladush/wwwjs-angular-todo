import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgIf, LowerCasePipe } from '@angular/common';
import { Task } from '../task';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf, LowerCasePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnChanges {
  constructor(private apiService: ApiService, private router: Router) {}

  private changeTask() {
    if (this.taskId) this.task = this.apiService.getTask(this.taskId);
    else this.task = undefined;
  }

  @Input() taskId: number = -1;

  task?: Task;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['taskId'].previousValue !== changes['taskId'].currentValue ||
      changes['taskId'].isFirstChange()
    ) {
      this.changeTask();
    }
  }

  complete(task: Task) {
    this.apiService.updateTask({ ...task, completed: true });
    this.router.navigate(['/tasks']);
  }
}
