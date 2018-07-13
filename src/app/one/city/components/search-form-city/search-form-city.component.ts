import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SearchCity } from './../../models/search-city.model';

@Component({
  selector: 'app-search-form-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-city.component.html',
  styles: []
})
export class SearchFormCityComponent implements OnChanges, OnInit {

  @Input() query: SearchCity;
  @Output() search: EventEmitter<SearchCity> = new EventEmitter<SearchCity>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormCity: FormGroup = this.formBuilder.group({
    city: this.formBuilder.group({
      city_id: new FormControl(''),
      city_name: new FormControl(''),
      city_code: new FormControl(''),
    }),
    estate: new FormControl('')
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

  onSubmit(searchFormCity: FormGroup) {
    this.search.emit(searchFormCity.value);
  }

  onCreate() {
    this.create.emit(true);
  }
}
