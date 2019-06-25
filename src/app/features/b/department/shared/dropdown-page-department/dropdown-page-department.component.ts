import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import { initialState } from '@web/app/features/b/department/store/reducers/search-department.reducer';

import { SearchDepartment } from '@web/app/features/b/department/models/search-department.model';

@Component({
  selector: 'app-dropdown-page-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-department.component.html',
  styles: []
})
export class DropdownPageDepartmentComponent implements OnChanges, OnInit {

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
  @Input() searchByKeyUp = true;
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchDepartment: SearchDepartment;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromDepartment.getAllEntities));
  entityId = 'department_id';

  constructor(
    private store: Store<fromDepartment.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromDepartment.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchDepartment) {
      setTimeout(() => {
        this.onLoad({
          department: (this.searchDepartment.department) ? this.searchDepartment.department : null
        });
      });
    }
  }

  onLoad(searchDepartment: SearchDepartment) {
    this.store.dispatch(fromDepartment.EntityActions.LoadEntityShared({
      search: searchDepartment
    }));
  }

  keyUp(event) {
    this.onLoad({
      department: {
        ...initialState.query.department,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
