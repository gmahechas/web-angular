import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  SearchTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/search-type-person-identification.model';

@Component({
  selector: 'app-search-form-type-person-identification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-type-person-identification.component.html',
  styles: []
})
export class SearchFormTypePersonIdentificationComponent implements OnChanges, OnInit {

  @Input() query: SearchTypePersonIdentification;
  @Output() search = new EventEmitter<SearchTypePersonIdentification>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormTypePersonIdentification = this.formBuilder.group({
    type_person_identification: this.formBuilder.group({
      type_person_identification_id: this.formBuilder.control(''),
      type_person_identification_description: this.formBuilder.control(''),
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormTypePersonIdentification.setValue({
      type_person_identification: {
        type_person_identification_id: this.query.type_person_identification.type_person_identification_id,
        type_person_identification_description: this.query.type_person_identification.type_person_identification_description
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormTypePersonIdentification.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
