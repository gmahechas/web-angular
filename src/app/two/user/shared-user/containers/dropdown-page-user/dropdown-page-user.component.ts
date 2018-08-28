import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { User } from './../../../models/user.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-page-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-user.component.html',
  styles: []
})
export class DropdownPageUserComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() placeholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$: Observable<User[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'user_id',
      optionLabel: 'user_name'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      user: {
        user_id: null,
        username: event,
        email: null
      },
      person: null,
      profile: null
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
