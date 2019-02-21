import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';

import { SearchHourRange } from '@web/app/features/f/hour-range/models/search-hour-range.model';

@Component({
  selector: 'app-dropdown-page-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-hour-range.component.html',
  styles: []
})
export class DropdownPageHourRangeComponent implements OnInit {

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
  @Input() searchHourRange: SearchHourRange;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromHourRange.getAllEntities));
  entityId = 'hour_range_id';

  constructor(
    private store: Store<fromHourRange.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchHourRange: SearchHourRange) {
    this.store.dispatch(new fromHourRange.LoadEntityShared({
      search: searchHourRange
    }));
  }

  keyUp(event) {
    this.onLoad({
      hour_range: {
        hour_range_id: '',
        hour_range_name: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
