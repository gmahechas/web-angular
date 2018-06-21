import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Country } from './../../../models/country.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-page-country',
  templateUrl: './dropdown-page-country.component.html',
  styleUrls: ['./dropdown-page-country.component.scss']
})
export class DropdownPageCountryComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  countries$: Observable<Country[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.countries$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      placeholder: 'Selecciona el pais',
      dataKey: 'country_id',
      optionLabel: 'country_name'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({ country_name: event, country_code: '' }));
  }
}
