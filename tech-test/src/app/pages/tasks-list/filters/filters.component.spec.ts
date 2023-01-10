import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined lifecycle methods', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.ngOnDestroy).toBeDefined();
  });

  describe('handleString()', () => {
    it('should be defined', () => {
      expect(component.handleString).toBeDefined();
    });

    it('should return trimmed string', () => {
      const testString = '    test   ';

      const handledString = component.handleString(testString);

      expect(handledString).toEqual('test');
    });

    it('should set all letters to lower case', () => {
      const testString = 'TeSt';

      const handledString = component.handleString(testString);

      expect(handledString).toEqual('test');
    });
  });

  it('ngOnInit() should init form of filters', () => {
    component.filtersForm = null;

    component.ngOnInit();

    expect(component.filtersForm).toBeInstanceOf(FormGroup);
  });
});
