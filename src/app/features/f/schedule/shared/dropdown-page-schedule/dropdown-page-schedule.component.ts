import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromSchedule from '@web/app/features/f/schedule/store';
import { initialState } from '@web/app/features/f/schedule/store/reducers/search-schedule.reducer';

import { SearchSchedule } from '@web/app/features/f/schedule/models/search-schedule.model';

@Component({
  selector: 'app-dropdown-page-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-schedule.component.html',
  styles: []
})
export class DropdownPageScheduleComponent implements OnChanges, OnInit {

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
  @Input() searchSchedule: SearchSchedule;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromSchedule.getAllEntities));
  entityId = 'schedule_id';

  constructor(
    private store: Store<fromSchedule.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromSchedule.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchSchedule) {
      setTimeout(() => {
        this.onLoad({
          schedule: (this.searchSchedule.schedule) ? this.searchSchedule.schedule : null
        });
      });
    }
  }

  onLoad(searchSchedule: SearchSchedule) {
    this.store.dispatch(new fromSchedule.LoadEntityShared({
      search: searchSchedule
    }));
  }

  keyUp(event) {
    this.onLoad({
      schedule: {
        ...initialState.query.schedule,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
