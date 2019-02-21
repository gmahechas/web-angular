import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';

import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

@Component({
  selector: 'app-dropdown-page-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-project.component.html',
  styles: []
})
export class DropdownPageProjectComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() searchProject: SearchProject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromProject.getAllEntities));
  entityId = 'project_id';

  constructor(
    private store: Store<fromProject.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchProject: SearchProject) {
    this.store.dispatch(new fromProject.LoadEntityShared({
      search: searchProject
    }));
  }

  keyUp(event) {
    this.onLoad({
      project: {
        project_id: '',
        project_name: event
      },
      macroproject: null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
