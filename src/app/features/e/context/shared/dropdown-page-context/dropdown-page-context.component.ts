import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/e/context/store';

@Component({
  selector: 'app-dropdown-page-context',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-context.component.html',
  styles: []
})
export class DropdownPageContextComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'context_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        context: {
          context_id: '',
          context_description: event
        },
        menu: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
