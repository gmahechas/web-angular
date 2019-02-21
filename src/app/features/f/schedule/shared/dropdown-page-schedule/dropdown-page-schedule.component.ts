import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromSchedule from '@web/app/features/f/schedule/store';

import { SearchSchedule } from '@web/app/features/f/schedule/models/search-schedule.model';

@Component({
  selector: 'app-dropdown-page-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-schedule.component.html',
  styles: []
})
export class DropdownPageScheduleComponent implements OnInit {

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
  @Input() searchSchedule: SearchSchedule;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromSchedule.getAllEntities));
  entityId = 'schedule_id';

  constructor(
    private store: Store<fromSchedule.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchSchedule: SearchSchedule) {
    this.store.dispatch(new fromSchedule.LoadEntityShared({
      search: searchSchedule
    }));
  }

  keyUp(event) {
    this.onLoad({
      schedule: {
        schedule_id: '',
        schedule_name: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
