import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TasksService } from '@services/tasks.service';
import { Task } from '@interfaces/task.interface';
import { Category } from '@enums/category.enum';
import { of } from 'rxjs';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;
  const testUncompletedTask: Task = {
    id: 1,
    label: 'Test',
    description: 'Test description',
    category: Category.House,
    done: false,
  };

  const testCompletedTask: Task = {
    id: 2,
    label: 'Kitchen Cleanup',
    description: 'Clean my dirty kitchen',
    category: Category.House,
    done: 'Tue Jan 10 2023 02:15:23 GMT+0400 (Georgia Standard Time)'
  };

  const tasks = [testCompletedTask, testUncompletedTask];

  beforeEach(async () => {
    const spyService = jasmine.createSpyObj('TasksService', ['getAllTasks', 'updateTask', 'removeTask']);

    await TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: TasksService, useValue: spyService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    component.tasks = [testUncompletedTask, testCompletedTask];
    component.allTasks = [...component.tasks];
    tasksServiceSpy = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    tasksServiceSpy.getAllTasks.and.returnValue(of(tasks));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined lifecycle methods', () => {
    expect(component.ngOnInit).toBeDefined();
  });

  it('should be defined all methods', () => {
    expect(component.setFilteredTasks).toBeDefined();
    expect(component.changeStatus).toBeDefined();
    expect(component.editTask).toBeDefined();
    expect(component.getTasks).toBeDefined();
    expect(component.addTask).toBeDefined();
    expect(component.removeTask).toBeDefined();
  });

  it('ngOnInit() should call method to get all tasks', () => {
    const spyMethod = spyOn(component, 'getTasks');

    component.ngOnInit();

    expect(spyMethod).toHaveBeenCalledTimes(1);
  });

  describe('setFilteredTasks()', () => {
    it('should return all tasks when filters are empty', () => {
      component.tasks = [];

      component.setFilteredTasks({label: '', category: ''});

      expect(component.tasks).toEqual(component.allTasks);
    });

    it('should filter tasks when filters are not empty', () => {
      component.tasks = [];

      component.setFilteredTasks({label: 'test', category: ''});

      expect(component.tasks).toEqual([testUncompletedTask]);
    });
  });

  it('changeStatus() should call service to save changes when task id is valid', () => {
    const updatedTask = {
      ...testUncompletedTask,
      done: false
    };
    tasksServiceSpy.updateTask.and.returnValue(of(updatedTask));

    component.changeStatus(updatedTask, false);

    expect(tasksServiceSpy.updateTask).toHaveBeenCalledOnceWith(updatedTask);
  });

  it('editTask() should set selected task', () => {
    component.selectedTask = null;

    component.editTask(testUncompletedTask);

    expect(component.selectedTask).toBe(testUncompletedTask);
  });

  it('addTask() should set selected task as empty task', () => {
    component.selectedTask = null;

    component.addTask();

    expect(component.selectedTask).toEqual({} as Task);
  });

  describe('getTasks()', () => {
    it('should call service to get all tasks', () => {
      component.getTasks();

      expect(tasksServiceSpy.getAllTasks).toHaveBeenCalled();
    });

    it('should update all tasks', () => {
      component.allTasks = [];
      component.getTasks();

      expect(component.allTasks).toEqual(tasks);
    });
  });

  describe('removeTask()', () => {
    it('should call service to remove the task', () => {
      tasksServiceSpy.removeTask.and.returnValue(of(true));

      component.removeTask(1);

      expect(tasksServiceSpy.removeTask).toHaveBeenCalledOnceWith(1);
    });

    it('should remove task from list of all tasks', () => {
      tasksServiceSpy.removeTask.and.returnValue(of(true));
      component.allTasks = [testUncompletedTask, testCompletedTask];

      component.removeTask(1);

      expect(component.allTasks).toEqual([testCompletedTask]);
    });
  });
});
