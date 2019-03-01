import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';

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
      this.store.dispatch(new fromCity.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
  }

  onLoad(searchCity: SearchCity) {
    this.store.dispatch(new fromCity.LoadEntityShared({
      search: searchCity
    }));
  }

  keyUp(event) {
    this.onLoad({
      city: {
        city_id: '',
        city_name: event,
        city_code: ''
      },
      estate: (this.searchCity) ? (this.searchCity.estate) ? this.searchCity.estate : null : null
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
