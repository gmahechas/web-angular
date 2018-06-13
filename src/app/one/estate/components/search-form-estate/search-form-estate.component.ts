import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SearchEstate } from './../../models/search-estate.model';

@Component({
  selector: 'app-search-form-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-estate.component.html',
  styleUrls: ['./search-form-estate.component.scss']
})
export class SearchFormEstateComponent implements OnInit {

  @Input() query: SearchEstate;
  @Output() search: EventEmitter<SearchEstate> = new EventEmitter<SearchEstate>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormEstate: FormGroup = this.formBuilder.group({
    estate_name: new FormControl(''),
    estate_code: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchFormEstate.setValue({
      estate_name: this.query.estate_name,
      estate_code: this.query.estate_code
    });
  }

  onSubmit(searchFormEstate: FormGroup) {
    this.search.emit(searchFormEstate.value);
  }

  onCreate() {
    this.create.emit(true);
  }
}
