import { Component, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { TasksService } from '@services/tasks.service';
import { finalize, take, tap } from 'rxjs/operators';
import { Filters } from '@interfaces/filters.interface';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  public tasks: Task[] = [];
  public selectedTask: Task;
  public inProgress = true;
  public allTasks: Task[] = [];

  private filters: Filters = {label: '', category: ''};

  constructor(private readonly tasksService: TasksService) { }

  public ngOnInit(): void {
    this.getTasks();
  }

  public taskTrackBy(index: number, task: Task) {
    return task.id;
  }

  public setFilteredTasks(filters: Filters): void {
    this.filters = filters;

    this.tasks = this.allTasks.filter((task: Task) =>
      task.label.toLowerCase().includes(filters.label) &&
      (task.category ? task.category.toLowerCase().includes(filters.category) : true)
    );
  }

  public changeStatus(task: Task, isDone: boolean): void {
    task.done = isDone ? new Date().toString() : false;

    this.tasksService.updateTask(task).pipe(
      take(1)
    ).subscribe();
  }

  public editTask(task: Task): void {
    this.selectedTask = task;
  }

  public getTasks(): void {
    this.inProgress = true;

    this.tasksService.getAllTasks().pipe(
      finalize(() => this.inProgress = false),
      take(1),
    ).subscribe((tasks: Task[]) => {
      this.allTasks = tasks;
      this.setFilteredTasks(this.filters);
    });
  }

  public addTask(): void {
    this.selectedTask = {} as Task;
  }

  public removeTask(taskId: number): void {
    this.tasksService.removeTask(taskId).pipe(
      tap(() => {
        this.allTasks = this.allTasks.filter((task: Task) => taskId !== task.id);
        this.setFilteredTasks(this.filters);
      }),
      take(1),
    ).subscribe();
  }
}
