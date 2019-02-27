import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromTypePerson from '@web/app/features/c/type-person/store';

import { SearchTypePerson } from '@web/app/features/c/type-person/models/search-type-person.model';

@Component({
  selector: 'app-dropdown-page-type-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-type-person.component.html',
  styles: []
})
export class DropdownPageTypePersonComponent implements OnInit {

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
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchTypePerson: SearchTypePerson;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromTypePerson.getAllEntities));
  entityId = 'type_person_id';

  constructor(
    private store: Store<fromTypePerson.State>
  ) { }

  ngOnInit() {
  }

  onLoad(searchTypePerson: SearchTypePerson) {
    this.store.dispatch(new fromTypePerson.LoadEntityShared({
      search: searchTypePerson
    }));
  }

  keyUp(event) {
    this.onLoad({
      type_person: {
        type_person_id: '',
        type_person_description: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
