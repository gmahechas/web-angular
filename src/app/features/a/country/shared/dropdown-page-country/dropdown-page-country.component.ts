import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';

@Component({
  selector: 'app-dropdown-page-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-country.component.html',
  styles: []
})
export class DropdownPageCountryComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter: boolean;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromCountry.getAllEntities));
  entityId = 'country_id';

  constructor(
    private store: Store<fromCountry.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromCountry.LoadEntityShared({
      search: {
        country: {
          country_id: '',
          country_name: event,
          country_code: ''
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
