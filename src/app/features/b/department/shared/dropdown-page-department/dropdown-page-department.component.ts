import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';

import { SearchDepartment } from '@web/app/features/b/department/models/search-department.model';

@Component({
  selector: 'app-dropdown-page-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-department.component.html',
  styles: []
})
export class DropdownPageDepartmentComponent implements OnInit {

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
  @Input() isConditional = false;
  @Input() keyUpTimes = 3;
  @Input() searchDepartment: SearchDepartment;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromDepartment.getAllEntities));
  entityId = 'department_id';

  constructor(
    private store: Store<fromDepartment.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchDepartment: SearchDepartment) {
    this.store.dispatch(new fromDepartment.LoadEntityShared({
      search: searchDepartment
    }));
  }

  keyUp(event) {
    this.onLoad({
      department: {
        department_id: '',
        department_name: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
