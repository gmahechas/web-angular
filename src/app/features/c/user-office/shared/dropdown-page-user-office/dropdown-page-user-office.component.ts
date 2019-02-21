import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';

import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

@Component({
  selector: 'app-dropdown-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user-office.component.html',
  styles: []
})
export class DropdownPageUserOfficeComponent implements OnInit {

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
  @Input() userOffice: UserOffice;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new fromUserOffice.LoadEntityShared({
        search: {
          user_office: {
            user_office_id: '',
            user_office_status: (this.userOffice.user_office_status) ? this.userOffice.user_office_status : null
          },
          user: (this.userOffice.user) ? this.userOffice.user : null,
          office: (this.userOffice.office) ? this.userOffice.office : null
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
