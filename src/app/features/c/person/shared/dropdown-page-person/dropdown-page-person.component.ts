import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';
import { initialState } from '@web/app/features/c/person/store/reducers/search-person.reducer';

import { SearchPerson } from '@web/app/features/c/person/models/search-person.model';

@Component({
  selector: 'app-dropdown-page-person',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-page-person.component.html',
  styles: []
})
export class DropdownPagePersonComponent implements OnChanges, OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() options: string[];
  @Input() optionLabel: string;
  @Input() filter = true;
  @Input() onlyShow: 'store' | 'store_form' | 'form' = 'store_form';
  @Input() placeholder: string[];
  @Input() filterPlaceholder: string[];
  @Input() showClear: boolean;
  @Input() dropdownIcon: string;
  @Input() emptyFilterMessage: string[];
  @Input() searchByKeyUp = true;
  @Input() isConditional = false;
  @Input() keyboardKey: 'Enter' | 'Any' = 'Any';
  @Input() keyUpTimes = 3;
  @Input() loadOnInit = false;
  @Input() searchPerson: SearchPerson;
  @Output() changeDropdown = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromPerson.getAllEntities));
  entityId = 'person_id';

  constructor(
    private store: Store<fromPerson.State>
  ) { }

  ngOnChanges() {
    if (this.isConditional) {
      this.store.dispatch(fromPerson.EntityActions.Reset({ redirect: false }));
    }
  }

  ngOnInit() {
    if (this.loadOnInit && this.searchPerson) {
      setTimeout(() => {
        this.onLoad({
          person: (this.searchPerson.person) ? this.searchPerson.person : null
        });
      });
    }
  }

  onLoad(searchPerson: SearchPerson) {
    this.store.dispatch(fromPerson.EntityActions.LoadEntityShared({
      search: searchPerson
    }));
  }

  keyUp(event) {
    this.onLoad({
      person: {
        ...initialState.query.person,
        [this.optionLabel]: event
      }
    });
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }

}
