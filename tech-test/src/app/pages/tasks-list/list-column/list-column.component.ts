import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@interfaces/task.interface';

@Component({
  selector: 'app-list-column',
  templateUrl: './list-column.component.html',
  styleUrls: ['./list-column.component.scss']
})
export class ListColumnComponent {
  @Input() public tasks: Task[] = [];
  @Input() public status: string;

  @Output() public droppedTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() public editTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() public removeTask: EventEmitter<number> = new EventEmitter<number>();
}
