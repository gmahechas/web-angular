import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SearchEstate } from './../../models/search-estate.model';

@Component({
  selector: 'app-search-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-estate.component.html',
  styles: []
})
export class SearchFormEstateComponent implements OnChanges, OnInit {

  @Input() query: SearchEstate;
  @Output() search: EventEmitter<SearchEstate> = new EventEmitter<SearchEstate>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormEstate: FormGroup = this.formBuilder.group({
    estate: this.formBuilder.group({
      estate_id: this.formBuilder.control(''),
      estate_name: this.formBuilder.control(''),
      estate_code: this.formBuilder.control(''),
    }),
    country: this.formBuilder.control(null)
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormEstate.setValue({
      estate: {
        estate_id: this.query.estate.estate_id,
        estate_name: this.query.estate.estate_name,
        estate_code: this.query.estate.estate_code
      },
      country: this.query.country
    });
  }

  ngOnInit() {
  }

  onSubmit(searchFormEstate: FormGroup) {
    this.search.emit(searchFormEstate.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
