import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';
import { initialState } from '@web/app/features/d/project/store/reducers/search-project.reducer';

import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

@Component({
  selector: 'app-dropdown-page-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-project.component.html',
  styles: []
})
export class DropdownPageProjectComponent implements OnChanges, OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchProject: SearchProject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromProject.getAllEntities));
  entityId = 'project_id';

  constructor(
    private store: Store<fromProject.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromProject.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchProject) {
      setTimeout(() => {
        this.onLoad({
          project: (this.searchProject.project) ? this.searchProject.project : null,
          macroproject: (this.searchProject.macroproject) ? this.searchProject.macroproject : null,
          office: (this.searchProject.office) ? this.searchProject.office : null
        });
      });
    }
  }

  onLoad(searchProject: SearchProject) {
    this.store.dispatch(new fromProject.LoadEntityShared({
      search: searchProject
    }));
  }

  keyUp(event) {
    this.onLoad({
      project: {
        ...initialState.query.project,
        [this.optionLabel]: event
      },
      macroproject: (this.searchProject) ? (this.searchProject.macroproject) ? this.searchProject.macroproject : null : null,
      office: (this.searchProject) ? (this.searchProject.office) ? this.searchProject.office : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
