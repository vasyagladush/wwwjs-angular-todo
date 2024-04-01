import { Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';

export const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
