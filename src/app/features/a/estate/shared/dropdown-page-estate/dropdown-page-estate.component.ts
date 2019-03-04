import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';
import { initialState } from '@web/app/features/a/estate/store/reducers/search-estate.reducer';

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
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() searchByKeyUp = true;
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
    if (this.loadOnInit && this.searchEstate) {
      setTimeout(() => {
        this.onLoad({
          estate: (this.searchEstate.estate) ? this.searchEstate.estate : null,
          country: (this.searchEstate.country) ? this.searchEstate.country : null
        });
      });
    }
  }

  onLoad(searchEstate: SearchEstate) {
    this.store.dispatch(new fromEstate.LoadEntityShared({
      search: searchEstate
    }));
  }

  keyUp(event) {
    this.onLoad({
      estate: {
        ...initialState.query.estate,
        [this.optionLabel]: event
      },
      country: (this.searchEstate) ? (this.searchEstate.country) ? this.searchEstate.country : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
