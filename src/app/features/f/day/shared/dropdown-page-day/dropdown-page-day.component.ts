import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/f/day/store';

@Component({
  selector: 'app-dropdown-page-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-day.component.html',
  styles: []
})
export class DropdownPageDayComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() showClear: boolean;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'day_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        day: {
          day_id: '',
          day_name: event
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
