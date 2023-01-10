import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filters } from '@interfaces/filters.interface';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  public filtersForm: FormGroup;

  @Output() public changeFilters: EventEmitter<Filters> = new EventEmitter<Filters>();

  private unSubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.filtersForm = this.formBuilder.group({
      label: '',
      category: '',
    });

    this.filtersForm.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.unSubscribe$)
    ).subscribe(() => {
      const filters: Filters = {
        label: this.handleString(this.filtersForm.value.label),
        category: this.handleString(this.filtersForm.value.category)
      };

      this.changeFilters.emit(filters);
    });
  }

  public handleString(filter: string): string {
    return filter.trim().toLowerCase();
  }

  public ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
