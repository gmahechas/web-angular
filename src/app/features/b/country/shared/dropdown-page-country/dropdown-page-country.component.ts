import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/b/country/store';

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
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'country_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
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