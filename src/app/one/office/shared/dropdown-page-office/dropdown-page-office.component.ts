import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/one/office/store';

@Component({
  selector: 'app-dropdown-page-office',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-office.component.html',
  styles: []
})
export class DropdownPageOfficeComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'office_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        office: {
          office_id: '',
          office_name: event
        },
        city: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}