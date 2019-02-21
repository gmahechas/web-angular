import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';

@Component({
  selector: 'app-dropdown-page-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-person.component.html',
  styles: []
})
export class DropdownPagePersonComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() keyboardKey: 'Enter' | 'Any' = 'Enter';
  @Input() keyUpTimes = 3;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromPerson.getAllEntities));
  entityId = 'person_id';

  constructor(
    private store: Store<fromPerson.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromPerson.LoadEntityShared({
      search: {
        person: {
          person_id: '',
          person_identification: event,
          person_names: ''
        }
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }

}
