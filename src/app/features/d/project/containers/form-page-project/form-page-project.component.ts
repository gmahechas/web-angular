import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';
import * as fromCore from '@web/app/core/store';

import { Project } from '@web/app/features/d/project/models/project.model';
import { initialStateSelectedProject } from '@web/app/features/d/project/models/selected-project.model';

@Component({
  selector: 'app-form-page-project',
  templateUrl: './form-page-project.component.html',
  styles: []
})
export class FormPageProjectComponent implements OnInit {

  pending$ = this.store.pipe(select(fromProject.getPending));
  project$ = this.store.pipe(select(fromProject.getSelectedByRouter));

  constructor(
    private store: Store<fromProject.State>
  ) { }

  ngOnInit() {
  }

  onStore(project: Project) {
    this.store.dispatch(fromProject.EntityActions.StoreEntity({ entity: project }));
  }

  onUpdate(project: Project) {
    this.store.dispatch(fromProject.EntityActions.UpdateEntity({ entity: project }));
  }

  onCancel() {
    this.store.dispatch(fromProject.EntityActions.SetSelected({ selected: initialStateSelectedProject }));
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

  onDestroy(project: Project) {
    this.store.dispatch(fromProject.EntityActions.DestroyEntity({ entity: project }));
  }

  onUserOfficeProject(project: Project) {
    this.store.dispatch(fromProject.EntityActions.SetSelected({ selected: { gotoUserOfficeProject: true } }));
    this.store.dispatch(new fromCore.Go({
      path: ['project', project.project_id, {
        outlets: {
          'router-outlet-user-office-project': ['user-office-project', 'project', project.project_id]
        }
      }]
    }));
  }
}
