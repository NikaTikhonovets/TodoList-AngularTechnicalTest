import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPageComponent } from './task-page/task-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsModule } from '@components/task-details/task-details.module';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: TaskPageComponent,
  }
];

@NgModule({
  declarations: [
    TaskPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TaskDetailsModule,
    MatButtonModule,
  ]
})
export class TaskPageModule { }
