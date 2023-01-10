import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '@services/tasks.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnChanges {
  @Input() public task: Task;
  @Input() public isEditMode: boolean;

  public taskFormGroup: FormGroup;

  @Output() public updateTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private readonly formBuilder: FormBuilder,
              private readonly tasksService: TasksService) { }

  public ngOnInit(): void {
    this.taskFormGroup = this.formBuilder.group({
      id: this.task?.id,
      label: [this.task?.label, Validators.required],
      description: this.task?.description,
      category: this.task?.category,
      done: !!this.task?.done
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.task?.currentValue && changes?.task?.previousValue) {
      this.taskFormGroup.reset();
      this.task = changes?.task?.currentValue;
      this.taskFormGroup.patchValue({
        ...changes?.task?.currentValue,
        done: !!changes?.task?.currentValue?.done
      });

      this.isEditMode = true;
    }
  }

  public saveChanges(): void {
    if (this.taskFormGroup.invalid) {
      this.taskFormGroup.markAllAsTouched();
      return;
    }

    this.task = {
      ...this.task,
      ...this.taskFormGroup.value,
      done: this.taskFormGroup.value.done ? this.task || new Date().toString() : false,
    };

    const saveTaskMethod = this.task.id ? this.tasksService.updateTask(this.task) : this.tasksService.createTask(this.task);

    saveTaskMethod.pipe(
      tap(() => {
        this.isEditMode = false;
        this.updateTask.emit(this.task);
      }),
      take(1)
    ).subscribe();
  }

}
