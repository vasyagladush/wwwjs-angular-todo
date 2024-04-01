import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private tasksNumber: number = 0;
  private completedTasksNumber: number = 0;
  private notCompletedTasksNumber: number = 0;

  constructor() {
    const tasksString = localStorage.getItem('tasks');
    if (!tasksString) {
      localStorage.setItem('tasks', JSON.stringify([]));
    } else {
      const tasks = JSON.parse(
        localStorage.getItem('tasks') || '[]'
      ) as Array<Task>;
      this.tasksNumber = tasks.length;
      this.completedTasksNumber = tasks.filter((el) => el.completed).length;
      this.notCompletedTasksNumber = tasks.filter((el) => !el.completed).length;
    }
  }

  getStatistics(): {
    tasksNumber: number;
    completedTasksNumber: number;
    notCompletedTasksNumber: number;
  } {
    this.getTasks();
    return {
      tasksNumber: this.tasksNumber,
      completedTasksNumber: this.completedTasksNumber,
      notCompletedTasksNumber: this.notCompletedTasksNumber,
    };
  }

  getTask(id: number): Task | undefined {
    return (
      JSON.parse(localStorage.getItem('tasks') || '[]') as Array<Task>
    ).find((el) => el.id === id);
  }

  getTasks(): Array<Task> {
    const tasks = JSON.parse(
      localStorage.getItem('tasks') || '[]'
    ) as Array<Task>;
    this.tasksNumber = tasks.length;
    this.completedTasksNumber = tasks.filter((el) => el.completed).length;
    this.notCompletedTasksNumber = tasks.filter((el) => !el.completed).length;
    return tasks;
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
