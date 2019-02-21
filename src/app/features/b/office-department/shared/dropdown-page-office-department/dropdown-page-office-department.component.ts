import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/b/office-department/store';

@Component({
  selector: 'app-dropdown-page-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-office-department.component.html',
  styles: []
})
export class DropdownPageOfficeDepartmentComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter: boolean;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'office_department_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
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
