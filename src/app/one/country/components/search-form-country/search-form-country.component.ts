import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SearchCountry } from './../../models/search-country.model';

@Component({
  selector: 'app-search-form-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-country.component.html',
  styleUrls: ['./search-form-country.component.scss']
})
export class SearchFormCountryComponent implements OnInit {

  @Input() query: SearchCountry;
  @Output() search: EventEmitter<SearchCountry> = new EventEmitter<SearchCountry>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormCountry: FormGroup = this.formBuilder.group({
    country_name: new FormControl(''),
    country_code: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchFormCountry.setValue({
      country_name: this.query.country_name,
      country_code: this.query.country_code
    });
  }

  onSubmit(searchFormCountry: FormGroup) {
    this.search.emit(searchFormCountry.value);
  }

  onCreate() {
    this.create.emit(true);
  }
}
