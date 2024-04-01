import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [RouterModule, LowerCasePipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.notCompletedTasks = this.apiService
      .getNotCompletedTasks()
      .sort((a, b) => b.id - a.id);

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.notCompletedTasks = this.apiService
          .getNotCompletedTasks()
          .sort((a, b) => b.id - a.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  routeSubscription!: Subscription;

  notCompletedTasks: Array<Task> = [];
}
