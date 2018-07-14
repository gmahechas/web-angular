import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { City } from './../../../models/city.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-page-city',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-city.component.html',
  styles: []
})
export class DropdownPageCityComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() placeholder: string;
  entities$: Observable<City[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'city_id',
      optionLabel: 'city_name'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      city: {
        city_id: null,
        city_name: event, // TODO
      }
    }));
  }
}
