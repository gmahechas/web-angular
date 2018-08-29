import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Country } from './../../../models/country.model';

import { Observable } from 'rxjs';

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
  entities$: Observable<Country[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'country_id'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      country: {
        country_id: null,
        country_name: event,
        country_code: ''
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
