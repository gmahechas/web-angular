import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';

@Component({
  selector: 'app-search-form-macroproject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-macroproject.component.html',
  styles: []
})
export class SearchFormMacroprojectComponent implements OnChanges, OnInit {

  @Input() query: SearchMacroproject;
  @Output() search = new EventEmitter<SearchMacroproject>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormMacroproject = this.formBuilder.group({
    macroproject: this.formBuilder.group({
      macroproject_id: this.formBuilder.control(''),
      macroproject_name: this.formBuilder.control('')
    }),
    city: this.formBuilder.control(''),
    office: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormMacroproject.setValue({
      macroproject: {
        macroproject_id: this.query.macroproject.macroproject_id,
        macroproject_name: this.query.macroproject.macroproject_name
      },
      city: this.query.city,
      office: this.query.office
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormMacroproject.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
