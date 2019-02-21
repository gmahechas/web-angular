import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';

import { SearchDay } from '@web/app/features/f/day/models/search-day.model';

@Component({
  selector: 'app-dropdown-page-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-day.component.html',
  styles: []
})
export class DropdownPageDayComponent implements OnInit {

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
  @Input() searchDay: SearchDay;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromDay.getAllEntities));
  entityId = 'day_id';

  constructor(
    private store: Store<fromDay.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchDay: SearchDay) {
    this.store.dispatch(new fromDay.LoadEntityShared({
      search: searchDay
    }));
  }

  keyUp(event) {
    this.onLoad({
      day: {
        day_id: '',
        day_name: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
