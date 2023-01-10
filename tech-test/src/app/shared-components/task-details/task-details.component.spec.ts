import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from '@services/tasks.service';
import { Task } from '@interfaces/task.interface';
import { Category } from '@enums/category.enum';
import { of } from 'rxjs';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;
  const testTask: Task = {
    id: 1,
    label: 'Test',
    description: 'Test description',
    category: Category.House,
    done: false,
  };

  beforeEach(async () => {
    const spyService = jasmine.createSpyObj('TasksService', ['createTask', 'updateTask']);

    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: TasksService, useValue: spyService},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    tasksServiceSpy = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should init form of filters', () => {
    component.taskFormGroup = null;

    component.ngOnInit();

    expect(component.taskFormGroup).toBeInstanceOf(FormGroup);
  });

  describe('saveChanges()', () => {
    it('should not update task when form is invalid', () => {
      component.taskFormGroup.patchValue({label: ''});

      component.saveChanges();

      expect(tasksServiceSpy.updateTask).toHaveBeenCalledTimes(0);
    });

    it('should update task when form is valid', () => {
      component.taskFormGroup.patchValue({...testTask});
      tasksServiceSpy.updateTask.and.returnValue(of(testTask));

      component.saveChanges();

      expect(tasksServiceSpy.updateTask).toHaveBeenCalledTimes(1);
    });

    it('should save task when form is valid', () => {
      component.taskFormGroup.patchValue({...testTask, id: null});
      tasksServiceSpy.createTask.and.returnValue(of(testTask));

      component.saveChanges();

      expect(tasksServiceSpy.createTask).toHaveBeenCalledTimes(1);
    });
  });
});
