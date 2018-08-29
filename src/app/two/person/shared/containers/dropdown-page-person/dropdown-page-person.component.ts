import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Person } from './../../../models/person.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-page-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-person.component.html',
  styles: []
})
export class DropdownPagePersonComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$: Observable<Person[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'person_id'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    // FIXME:
    /*
        this.store.dispatch(new fromStore.LoadEntityShared({
          person: {

          }
        }));
     */
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
