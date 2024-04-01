import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent {}
