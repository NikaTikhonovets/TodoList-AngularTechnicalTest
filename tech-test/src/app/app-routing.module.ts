import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@enums/application-routes.enum';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ApplicationRoutes.List },
  {
    path: ApplicationRoutes.List,
    loadChildren: () => import('./pages/tasks-list/tasks-list.module').then((module: any) => module.TasksListModule),
  },
  {
    path: `${ApplicationRoutes.Task}/:taskId`,
    loadChildren: () => import('./pages/task-page/task-page.module').then((module: any) => module.TaskPageModule),
  },
  { path: '**', redirectTo: ApplicationRoutes.List },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
