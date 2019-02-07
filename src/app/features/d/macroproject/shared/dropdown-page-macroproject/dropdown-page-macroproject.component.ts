import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';

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
  @Input() showClear: boolean;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromMacroproject.getAllEntities));
  entityId = 'macroproject_id';

  constructor(
    private store: Store<fromMacroproject.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromMacroproject.LoadEntityShared({
      search: {
        macroproject: {
          macroproject_id: '',
          macroproject_name: event,
        },
        city: null,
        office: null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
