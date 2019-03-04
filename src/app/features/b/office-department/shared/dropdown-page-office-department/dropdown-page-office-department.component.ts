import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';
import { initialState } from '@web/app/features/b/office-department/store/reducers/search-office-department.reducer';

import { SearchOfficeDepartment } from '@web/app/features/b/office-department/models/search-office-department.model';

@Component({
  selector: 'app-dropdown-page-office-department',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-office-department.component.html',
  styles: []
})
export class DropdownPageOfficeDepartmentComponent implements OnChanges, OnInit {

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
  @Input() searchByKeyUp = true;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchOfficeDepartment: SearchOfficeDepartment;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromOfficeDepartment.getAllEntities));
  entityId = 'office_department_id';

  constructor(
    private store: Store<fromOfficeDepartment.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromOfficeDepartment.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchOfficeDepartment) {
      setTimeout(() => {
        this.onLoad({
          office_department:
            (this.searchOfficeDepartment.office_department) ?
              this.searchOfficeDepartment.office_department : null,
          office:
            (this.searchOfficeDepartment.office) ?
              this.searchOfficeDepartment.office : null,
          department:
            (this.searchOfficeDepartment.department) ?
              this.searchOfficeDepartment.department : null
        });
      });
    }
  }

  onLoad(searchOfficeDepartment: SearchOfficeDepartment) {
    this.store.dispatch(new fromOfficeDepartment.LoadEntityShared({
      search: searchOfficeDepartment
    }));
  }

  keyUp(event) {
    this.onLoad({
      office_department:
        (this.searchOfficeDepartment) ?
          (this.searchOfficeDepartment.office_department) ?
            this.searchOfficeDepartment.office_department : null : null,
      office:
        (this.searchOfficeDepartment) ?
          (this.searchOfficeDepartment.office) ?
            this.searchOfficeDepartment.office : null : null,
      department:
        (this.searchOfficeDepartment) ?
          (this.searchOfficeDepartment.department) ?
            this.searchOfficeDepartment.department : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
