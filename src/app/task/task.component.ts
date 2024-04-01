import { Component } from '@angular/core';
import { NgIf, LowerCasePipe } from '@angular/common';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf, LowerCasePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task?: Task = undefined;
}
