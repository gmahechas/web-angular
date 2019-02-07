import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchTypePerson } from '@web/app/features/c/type-person/models/search-type-person.model';

@Component({
  selector: 'app-search-form-type-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-type-person.component.html',
  styles: []
})
export class SearchFormTypePersonComponent implements OnChanges, OnInit {

  @Input() query: SearchTypePerson;
  @Output() search = new EventEmitter<SearchTypePerson>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormTypePerson = this.formBuilder.group({
    type_person: this.formBuilder.group({
      type_person_id: this.formBuilder.control(''),
      type_person_description: this.formBuilder.control(''),
    })
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormTypePerson.setValue({
      type_person: {
        type_person_id: this.query.type_person.type_person_id,
        type_person_description: this.query.type_person.type_person_description
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormTypePerson.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
