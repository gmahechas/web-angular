import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Country } from '../../../models/country.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-country',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-country.component.html',
  styleUrls: ['./dropdown-country.component.scss']
})
export class DropdownCountryComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() configDropDown: any;
  data$: Observable<Country[]>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
  }

  ngOnInit() {
  }

  onKeyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({ country_name: event, country_code: '' }));
  }

}
