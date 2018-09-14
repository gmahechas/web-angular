import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Project } from './../../models/project.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-page-project',
  templateUrl: './form-page-project.component.html',
  styles: []
})
export class FormPageProjectComponent implements OnInit {

  project$: Observable<Project>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.project$ = store.pipe(select(fromStore.getSelectedByRouter));
  }

  ngOnInit() {
  }

  onStore(project: Project) {
    this.store.dispatch(new fromStore.StoreEntity(project));
  }

  onUpdate(project: Project) {
    this.store.dispatch(new fromStore.UpdateEntity(project));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

  onDestroy(project: Project) {
    this.store.dispatch(new fromStore.DestroyEntity(project));
  }
}
