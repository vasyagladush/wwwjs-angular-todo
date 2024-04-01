import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (!tasks) localStorage.setItem('tasks', JSON.stringify([]));
  }

  getTask(id: number): Task | undefined {
    return (
      JSON.parse(localStorage.getItem('tasks') || '[]') as Array<Task>
    ).find((el) => el.id === id);
  }

  getTasks(): Array<Task> {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  getNotCompletedTasks(): Array<Task> {
    return (
      JSON.parse(localStorage.getItem('tasks') || '[]') as Array<Task>
    ).filter((el) => !el.completed);
  }

  getCompletedTasks(): Array<Task> {
    return (
      JSON.parse(localStorage.getItem('tasks') || '[]') as Array<Task>
    ).filter((el) => el.completed);
  }

  createTask(task: Omit<Task, 'id' | 'completed'>): void {
    const tasks = this.getTasks();
    const newTask = { id: this.genId(tasks), completed: false, ...task };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((el) => el.id === task.id);
    tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  genId(tasks: Array<Task>): number {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  }
}
