import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';

import { User } from '@web/app/features/c/user/models/user.model';

@Component({
  selector: 'app-dropdown-page-user-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user-office.component.html',
  styles: []
})
export class DropdownPageUserOfficeComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() user: User;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromUserOffice.getAllEntities));
  entityId = 'user_office_id';

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
/*     this.store.dispatch(new fromUserOffice.LoadEntityShared({
      search: {
        user-office: {
          // TODO:
        },
        // TODO:
      }
    })); */
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
