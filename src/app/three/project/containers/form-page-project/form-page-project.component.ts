import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@app/app/three/project/store';
import * as fromCore from '@app/app/core/store';

import { Project } from '@app/app/three/project/models/project.model';

@Component({
  selector: 'app-form-page-project',
  templateUrl: './form-page-project.component.html',
  styles: []
})
export class FormPageProjectComponent implements OnInit {

  project$ = this.store.pipe(select(fromStore.getSelectedByRouter));

  constructor(
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  onStore(project: Project) {
    this.store.dispatch(new fromStore.StoreEntity({ entity: project }));
  }

  onUpdate(project: Project) {
    this.store.dispatch(new fromStore.UpdateEntity({ entity: project }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

  onDestroy(project: Project) {
    this.store.dispatch(new fromStore.DestroyEntity({ entity: project }));
  }
}
