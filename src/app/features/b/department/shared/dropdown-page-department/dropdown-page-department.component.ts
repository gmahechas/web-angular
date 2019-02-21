import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/b/department/store';

@Component({
  selector: 'app-dropdown-page-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-department.component.html',
  styles: []
})
export class DropdownPageDepartmentComponent implements OnInit {

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
  entityId = 'department_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        department: {
          department_id: '',
          department_name: event
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
