import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchOffice } from '@web/app/one/office/models/search-office.model';

@Component({
  selector: 'app-search-form-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-office.component.html',
  styles: []
})
export class SearchFormOfficeComponent implements OnChanges, OnInit {

  @Input() query: SearchOffice;
  @Output() search: EventEmitter<SearchOffice> = new EventEmitter<SearchOffice>();
  @Output() create: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() resetSearch: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchFormOffice = this.formBuilder.group({
    office: this.formBuilder.group({
      office_id: this.formBuilder.control(''),
      office_name: this.formBuilder.control('')
    }),
    city: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormOffice.setValue({
      office: {
        office_id: this.query.office.office_id,
        office_name: this.query.office.office_name
      },
      city: this.query.city
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormOffice.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
