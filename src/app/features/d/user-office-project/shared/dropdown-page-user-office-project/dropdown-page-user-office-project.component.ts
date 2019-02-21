import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/d/user-office-project/store';

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
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() searchUserOfficeProject: SearchUserOfficeProject;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'user_office_project_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new fromStore.LoadEntityShared({
        search: {
          user_office_project: {
            user_office_project_id: '',
            user_office_project_status:
              (this.searchUserOfficeProject.user_office_project.user_office_project_status) ?
                this.searchUserOfficeProject.user_office_project.user_office_project_status : null
          },
          user_office: (this.searchUserOfficeProject.user_office) ? this.searchUserOfficeProject.user_office : null,
          project: (this.searchUserOfficeProject.project) ? this.searchUserOfficeProject.project : null
        }
      }));
    });
  }

  keyUp(event) {
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
