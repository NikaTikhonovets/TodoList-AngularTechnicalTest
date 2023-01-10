import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPageComponent } from './task-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@services/tasks.service';
import { Task } from '@interfaces/task.interface';
import { Category } from '@enums/category.enum';
import { of, throwError } from 'rxjs';
import { ApplicationRoutes } from '@enums/application-routes.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;
  const testTask: Task = {
    id: 1,
    label: 'Test',
    description: 'Test description',
    category: Category.House,
    done: false,
  };
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TasksService', ['getTaskById']);
    spy.getTaskById.and.returnValue(of(testTask));

    await TestBed.configureTestingModule({
      declarations: [TaskPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([
                ['taskId', 1],
              ]),
            },
          },
        },
        { provide: TasksService, useValue: spy },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    tasksServiceSpy = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined lifecycle methods', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  describe('ngOnInit()', () => {
    it('should get current task by Id', () => {
      component.task = null;
      const stubTask = of(testTask);
      tasksServiceSpy.getTaskById.and.returnValue(stubTask);

      component.ngOnInit();

      expect(component.task).toEqual(testTask);
    });

    it('should navigate to list when task id is incorrect', () => {
      component.task = null;
      tasksServiceSpy.getTaskById.and.returnValue(throwError({status: 404}));
      const navigateSpy = spyOn(router, 'navigate');

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalledWith([ApplicationRoutes.List]);
    });
  });
});
