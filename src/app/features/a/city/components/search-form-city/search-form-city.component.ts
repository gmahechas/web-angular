import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchCity } from '@web/app/features/a/city/models/search-city.model';

@Component({
  selector: 'app-search-form-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-city.component.html',
  styles: []
})
export class SearchFormCityComponent implements OnChanges, OnInit {

  @Input() query: SearchCity;
  @Output() search = new EventEmitter<SearchCity>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormCity = this.formBuilder.group({
    city: this.formBuilder.group({
      city_id: this.formBuilder.control(''),
      city_name: this.formBuilder.control(''),
      city_code: this.formBuilder.control(''),
    }),
    estate: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormCity.setValue({
      city: {
        city_id: this.query.city.city_id,
        city_name: this.query.city.city_name,
        city_code: this.query.city.city_code
      },
      estate: this.query.estate
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormCity.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
