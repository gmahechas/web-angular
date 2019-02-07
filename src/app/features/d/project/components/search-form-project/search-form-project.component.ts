import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

@Component({
  selector: 'app-search-form-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-form-project.component.html',
  styles: []
})
export class SearchFormProjectComponent implements OnChanges, OnInit {

  @Input() query: SearchProject;
  @Output() search = new EventEmitter<SearchProject>();
  @Output() create = new EventEmitter<boolean>();
  @Output() resetSearch = new EventEmitter<boolean>();

  searchFormProject = this.formBuilder.group({
    project: this.formBuilder.group({
      project_id: this.formBuilder.control(''),
      project_name: this.formBuilder.control('')
    }),
    macroproject: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges() {
    this.searchFormProject.setValue({
      project: {
        project_id: this.query.project.project_id,
        project_name: this.query.project.project_name
      },
      macroproject: this.query.macroproject
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.search.emit(this.searchFormProject.value);
  }

  onCreate() {
    this.create.emit(true);
  }

  onReset() {
    this.resetSearch.emit(true);
  }
}
