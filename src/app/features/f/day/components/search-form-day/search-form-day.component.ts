import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchDay } from '@web/app/features/f/day/models/search-day.model';

@Component({
  selector: 'app-search-form-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-day.component.html',
  styles: []
})
export class SearchFormDayComponent implements OnChanges, OnInit {

  @Input() query: SearchDay;
  @Output() search = new EventEmitter<SearchDay>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormDay = this.formBuilder.group({
    day: this.formBuilder.group({
      // TODO
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormDay.setValue({
      day: {
        // TODO
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormDay.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
