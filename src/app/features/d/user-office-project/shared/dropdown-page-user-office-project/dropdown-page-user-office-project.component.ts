import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/d/user-office-project/store';

import { SearchUserOfficeProject } from '@web/app/features/d/user-office-project/models/search-user-office-project.model';

@Component({
  selector: 'app-dropdown-page-user-office-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user-office-project.component.html',
  styles: []
})
export class DropdownPageUserOfficeProjectComponent implements OnInit {

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
  @Input() searchUserOfficeProject: SearchUserOfficeProject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_project_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.onLoad({
        user_office_project: {
          user_office_project_id: '',
          user_office_project_status:
            (this.searchUserOfficeProject.user_office_project.user_office_project_status) ?
              this.searchUserOfficeProject.user_office_project.user_office_project_status : null
        },
        user_office:
          (this.searchUserOfficeProject) ?
            (this.searchUserOfficeProject.user_office) ? this.searchUserOfficeProject.user_office : null : null,
        project:
          (this.searchUserOfficeProject) ?
            (this.searchUserOfficeProject.project) ? this.searchUserOfficeProject.project : null : null
      });
    });
  }

  onLoad(searchUserOfficeProject: SearchUserOfficeProject) {
    this.store.dispatch(new fromUserOffice.LoadEntityShared({
      search: searchUserOfficeProject
    }));
  }

  keyUp(event) {
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
