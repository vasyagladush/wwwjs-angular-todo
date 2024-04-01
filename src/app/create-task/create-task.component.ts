import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  constructor(private apiService: ApiService) {}

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    details: new FormControl(''),
  });

  onSubmit() {
    this.apiService.createTask({
      title: this.taskForm.value.title!,
      details: this.taskForm.value.details ?? '',
    });
  }
}
