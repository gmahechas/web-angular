import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../store';

import { Project } from './../../../models/project.model';

import { Observable } from 'rxjs';

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
  @Output() changeDropdown: EventEmitter<any> = new EventEmitter<any>();
  entities$: Observable<Project[]>;
  configDropDown: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.entities$ = store.pipe(select(fromStore.getAllEntities));
    this.configDropDown = {
      dataKey: 'project_id'
    };
  }

  ngOnInit() {
  }

  keyUp(event) {
    this.store.dispatch(new fromStore.LoadEntityShared({
      project: {
        project_id: '',
        project_name: event
      },
      macroproject: null
    }));
  }

  handleChange(event) {
    this.changeDropdown.emit(event);
  }
}
