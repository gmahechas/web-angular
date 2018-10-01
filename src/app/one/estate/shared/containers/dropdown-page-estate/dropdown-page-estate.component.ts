import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

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
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'estate_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        estate: {
          estate_id: '',
          estate_name: event,
          estate_code: ''
        },
        country: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
