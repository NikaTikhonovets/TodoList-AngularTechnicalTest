import { getTestBed, TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Task } from '@interfaces/task.interface';
import { Category } from '@enums/category.enum';

describe('TasksService', () => {
  let injector: TestBed;
  let service: TasksService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    injector = getTestBed();
    service = injector.get(TasksService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllTasks() should return all tasks', () => {
    service.getAllTasks().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(tasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(tasks);
  });

  it('getTaskById() should return an task', () => {
    service.getTaskById(1).subscribe(task => {
      expect(task).toEqual(testUncompletedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('GET');
    req.flush(testUncompletedTask);
  });

  it('updateTask() should update task', () => {
    service.updateTask(testUncompletedTask).subscribe(task => {
      expect(task).toEqual(testUncompletedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(testUncompletedTask);
  });

  it('createTask() should update task', () => {
    service.createTask(testUncompletedTask).subscribe(task => {
      expect(task).toEqual(testUncompletedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(testUncompletedTask);
  });

  it('removeTask() should remove task', () => {
    service.removeTask(1).subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
