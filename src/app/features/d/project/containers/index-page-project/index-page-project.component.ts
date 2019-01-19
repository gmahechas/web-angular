import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';
import * as fromCore from '@web/app/core/store';

import { Project } from '@web/app/features/d/project/models/project.model';
import { SearchProject } from '@web/app/features/d/project/models/search-project.model';
import { SelectedProject, initialStateSelectedProject } from '@web/app/features/d/project/models/selected-project.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-project',
  templateUrl: './index-page-project.component.html',
  styles: []
})
export class IndexPageProjectComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Project;

  query$ = this.store.pipe(select(fromProject.getQuery));

  data$ = this.store.pipe(select(fromProject.getAllEntities));
  total$ = this.store.pipe(select(fromProject.getTotal));
  perPage$ = this.store.pipe(select(fromProject.getPerPage));
  from$ = this.store.pipe(select(fromProject.getFrom));
  to$ = this.store.pipe(select(fromProject.getTo));
  configTable: any;

  constructor(
    private store: Store<fromProject.State>
  ) {
    this.configTable = {
      dataKey: 'project_id',
      cols: [
        { fields: ['project_id'], header: ['project.model.project_id'], style: { width: '5%' } },
        { fields: ['project_name'], header: ['project.model.project_name'], style: { width: '25%' } },
        { fields: ['project_address'], header: ['project.model.project_address'], style: { width: '25%' } },
        { fields: ['project_phone'], header: ['project.model.project_phone'], style: { width: '15%' } },
        { fields: ['macroproject.macroproject_name'], header: ['macroproject.singular'], style: { width: '30%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromProject.getSelected), take(1)).subscribe(
      (selected: SelectedProject) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['project', selected.selectedEntity.project_id]
          }));
        }
      }
    );
  }

  onLoad(projectSearch: SearchProject) {
    this.store.dispatch(new fromProject.LoadEntity({
      search: {
        project: projectSearch.project,
        macroproject: projectSearch.macroproject,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromProject.SetSelected({ selected: initialStateSelectedProject }));
    this.store.dispatch(new fromCore.Go({
      path: ['project', 'create']
    }));
  }

  onEdit(project: Project) {
    this.store.dispatch(new fromProject.SetSelected({ selected: { ...initialStateSelectedProject, selectedEntity: project } }));
    this.store.dispatch(new fromCore.Go({
      path: ['project', project.project_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromProject.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromProject.SetSelected({ selected: initialStateSelectedProject }));
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromProject.ResetSearch());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
