import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';

import { Country } from '@web/app/features/a/country/models/country.model';

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
  @Input() showClear: boolean;
  @Input() country: Country;
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$ = this.store.pipe(select(fromEstate.getAllEntities));
  entityId = 'estate_id';

  constructor(
    private store: Store<fromEstate.State>
  ) { }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromEstate.LoadEntityShared({
      search: {
        estate: {
          estate_id: '',
          estate_name: event,
          estate_code: ''
        },
        country: (this.country) ? this.country : null
      }
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
