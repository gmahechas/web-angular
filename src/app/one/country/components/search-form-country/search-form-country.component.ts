import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SearchCountry } from './../../models/search-country.model';

@Component({
  selector: 'app-search-form-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-country.component.html',
  styles: []
})
export class SearchFormCountryComponent implements OnChanges, OnInit {

  @Input() query: SearchCountry;
  @Output() search: EventEmitter<SearchCountry> = new EventEmitter<SearchCountry>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormCountry: FormGroup = this.formBuilder.group({
    country: this.formBuilder.group({
      country_id: new FormControl(''),
      country_name: new FormControl(''),
      country_code: new FormControl('')
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormCountry.setValue({
      country: {
        country_id: this.query.country.country_id,
        country_name: this.query.country.country_name,
        country_code: this.query.country.country_code
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(searchFormCountry: FormGroup) {
    this.search.emit(searchFormCountry.value);
  }

  onCreate() {
    this.create.emit(true);
  }
}
