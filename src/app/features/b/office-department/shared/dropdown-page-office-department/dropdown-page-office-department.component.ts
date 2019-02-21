import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';

import { SearchOfficeDepartment } from '@web/app/features/b/office-department/models/search-office-department.model';

@Component({
  selector: 'app-dropdown-page-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-office-department.component.html',
  styles: []
})
export class DropdownPageOfficeDepartmentComponent implements OnInit {

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
  @Input() searchOfficeDepartment: SearchOfficeDepartment;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromOfficeDepartment.getAllEntities));
  entityId = 'office_department_id';

  constructor(
    private store: Store<fromOfficeDepartment.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromOfficeDepartment.LoadEntityShared({
      search: {
        office_department: {
          office_department_id: '',
          office_department_status: null
        },
        office: null,
        department: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
