import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/d/project/store';

@Component({
  selector: 'app-dropdown-page-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-project.component.html',
  styles: []
})
export class DropdownPageProjectComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() showClear: boolean;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromStore.getAllEntities));
  entityId = 'project_id';

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      search: {
        project: {
          project_id: '',
          project_name: event
        },
        macroproject: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
