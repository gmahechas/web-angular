import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';

import { SearchEstate } from '@web/app/features/a/estate/models/search-estate.model';

@Component({
  selector: 'app-dropdown-page-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-estate.component.html',
  styles: []
})
export class DropdownPageEstateComponent implements OnChanges, OnInit {

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
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchEstate: SearchEstate;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromEstate.getAllEntities));
  entityId = 'estate_id';

  constructor(
    private store: Store<fromEstate.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromEstate.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
  }

  onLoad(searchEstate: SearchEstate) {
    this.store.dispatch(new fromEstate.LoadEntityShared({
      search: searchEstate
    }));
  }

  keyUp(event) {
    this.onLoad({
      estate: {
        estate_id: '',
        estate_name: event,
        estate_code: ''
      },
      country: (this.searchEstate) ? (this.searchEstate.country) ? this.searchEstate.country : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
