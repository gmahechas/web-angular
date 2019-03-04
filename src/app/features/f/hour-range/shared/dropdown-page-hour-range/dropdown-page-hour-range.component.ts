import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import { initialState } from '@web/app/features/f/hour-range/store/reducers/search-hour-range.reducer';

import { SearchHourRange } from '@web/app/features/f/hour-range/models/search-hour-range.model';

@Component({
  selector: 'app-dropdown-page-hour-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-hour-range.component.html',
  styles: []
})
export class DropdownPageHourRangeComponent implements OnChanges, OnInit {

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
  @Input() searchHourRange: SearchHourRange;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromHourRange.getAllEntities));
  entityId = 'hour_range_id';

  constructor(
    private store: Store<fromHourRange.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromHourRange.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchHourRange) {
      setTimeout(() => {
        this.onLoad({
          hour_range: (this.searchHourRange.hour_range) ? this.searchHourRange.hour_range : null
        });
      });
    }
  }

  onLoad(searchHourRange: SearchHourRange) {
    this.store.dispatch(new fromHourRange.LoadEntityShared({
      search: searchHourRange
    }));
  }

  keyUp(event) {
    this.onLoad({
      hour_range: {
        ...initialState.query.hour_range,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
