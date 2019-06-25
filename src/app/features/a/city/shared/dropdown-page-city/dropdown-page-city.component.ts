import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';
import { initialState } from '@web/app/features/a/city/store/reducers/search-city.reducer';

import { SearchCity } from '@web/app/features/a/city/models/search-city.model';

@Component({
  selector: 'app-dropdown-page-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-city.component.html',
  styles: []
})
export class DropdownPageCityComponent implements OnChanges, OnInit {

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
  @Input() searchCity: SearchCity;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromCity.getAllEntities));
  entityId = 'city_id';

  constructor(
    private store: Store<fromCity.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromCity.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchCity) {
      setTimeout(() => {
        this.onLoad({
          city: (this.searchCity.city) ? this.searchCity.city : null,
          estate: (this.searchCity.estate) ? this.searchCity.estate : null
        });
      });
    }
  }

  onLoad(searchCity: SearchCity) {
    this.store.dispatch(fromCity.EntityActions.LoadEntityShared({
      search: searchCity
    }));
  }

  keyUp(event) {
    this.onLoad({
      city: {
        ...initialState.query.city,
        [this.optionLabel]: event
      },
      estate: (this.searchCity) ? (this.searchCity.estate) ? this.searchCity.estate : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
