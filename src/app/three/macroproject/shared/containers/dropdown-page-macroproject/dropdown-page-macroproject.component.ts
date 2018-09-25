import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-dropdown-page-macroproject',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-macroproject.component.html',
  styles: []
})
export class DropdownPageMacroprojectComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'macroproject_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      macroproject: {
        macroproject_id: '',
        macroproject_name: event,
      },
      city: null,
      office: null
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
