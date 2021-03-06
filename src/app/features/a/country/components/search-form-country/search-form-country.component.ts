import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchCountry } from '@web/app/features/a/country/models/search-country.model';

@Component({
  selector: 'app-search-form-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-country.component.html',
  styles: []
})
export class SearchFormCountryComponent implements OnChanges, OnInit {

  @Input() query: SearchCountry;
  @Output() search = new EventEmitter<SearchCountry>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormCountry = this.formBuilder.group({
    country: this.formBuilder.group({
      country_id: this.formBuilder.control(''),
      country_name: this.formBuilder.control(''),
      country_code: this.formBuilder.control('')
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

  onSubmit() {
    this.search.emit(this.searchFormCountry.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
