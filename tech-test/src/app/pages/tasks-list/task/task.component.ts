import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { ApplicationRoutes } from '@enums/application-routes.enum';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() public task: Task;
  @Output() public editTask: EventEmitter<void> = new EventEmitter<void>();
  @Output() public changeStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() public removeTask: EventEmitter<void> = new EventEmitter<void>();

  public readonly routes: typeof ApplicationRoutes = ApplicationRoutes;
}
