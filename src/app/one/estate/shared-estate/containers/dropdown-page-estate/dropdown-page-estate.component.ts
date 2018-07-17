import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Estate } from './../../../models/estate.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-page-estate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-estate.component.html',
  styles: []
})
export class DropdownPageEstateComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() placeholder: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  entities$: Observable<Estate[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'estate_id',
      optionLabel: 'estate_name'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      estate: {
        estate_id: null,
        estate_name: event,
        estate_code: ''
      },
      country: null
    }));
  }

  onChange(event) {
    this.change.emit(event);
  }
}
