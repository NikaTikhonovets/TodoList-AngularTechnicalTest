import { Component, OnInit } from '@angular/core';
import { TasksService } from '@services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '@interfaces/task.interface';
import { ApplicationRoutes } from '@enums/application-routes.enum';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  public task: Task;
  public readonly routes: typeof ApplicationRoutes = ApplicationRoutes;

  constructor(private readonly tasksService: TasksService,
              private readonly route: ActivatedRoute,
              public readonly router: Router) { }

  public ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('taskId');

    this.tasksService.getTaskById(id).subscribe(
      (task: Task) => this.task = task,
      () => this.router.navigate([ApplicationRoutes.List])
    );
  }

}
