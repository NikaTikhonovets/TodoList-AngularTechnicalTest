import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListColumnComponent } from './list-column/list-column.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CategoryModule } from '@components/category/category.module';
import { TaskDetailsModule } from '@components/task-details/task-details.module';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
  }
];

@NgModule({
  declarations: [
    TasksListComponent,
    TaskComponent,
    ListColumnComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    MatButtonToggleModule,
    CategoryModule,
    TaskDetailsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class TasksListModule { }
