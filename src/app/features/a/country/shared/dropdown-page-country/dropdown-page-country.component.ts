import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';
import { initialState } from '@web/app/features/a/country/store/reducers/search-country.reducer';

import { SearchCountry } from '@web/app/features/a/country/models/search-country.model';

@Component({
  selector: 'app-dropdown-page-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-country.component.html',
  styles: []
})
export class DropdownPageCountryComponent implements OnChanges, OnInit {

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
  @Input() searchCountry: SearchCountry;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromCountry.getAllEntities));
  entityId = 'country_id';

  constructor(
    private store: Store<fromCountry.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(new fromCountry.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchCountry) {
      setTimeout(() => {
        this.onLoad({
          country: (this.searchCountry.country) ? this.searchCountry.country : null
        });
      });
    }
  }

  onLoad(searchCountry: SearchCountry) {
    this.store.dispatch(new fromCountry.LoadEntityShared({
      search: searchCountry
    }));
  }

  keyUp(event) {
    this.onLoad({
      country: {
        ...initialState.query.country,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
