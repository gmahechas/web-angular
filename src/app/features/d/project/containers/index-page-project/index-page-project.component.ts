import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/d/project/store';
import * as fromCore from '@web/app/core/store';

import { Project } from '@web/app/features/d/project/models/project.model';
import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

@Component({
  selector: 'app-index-page-project',
  templateUrl: './index-page-project.component.html',
  styles: []
})
export class IndexPageProjectComponent implements OnInit {

  query$ = this.store.pipe(select(fromStore.getQuery));

  data$ = this.store.pipe(select(fromStore.getAllEntities));
  total$ = this.store.pipe(select(fromStore.getTotal));
  perPage$ = this.store.pipe(select(fromStore.getPerPage));
  from$ = this.store.pipe(select(fromStore.getFrom));
  to$ = this.store.pipe(select(fromStore.getTo));
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.configTable = {
      dataKey: 'project_id',
      cols: [
        { fields: ['project_id'], header: ['project.model.project_id'], style: { 'width': '5%' } },
        { fields: ['project_name'], header: ['project.model.project_name'], style: { 'width': '25%' } },
        { fields: ['project_address'], header: ['project.model.project_address'], style: { 'width': '25%' } },
        { fields: ['project_phone'], header: ['project.model.project_phone'], style: { 'width': '15%' } },
        { fields: ['macroproject.macroproject_name'], header: ['macroproject.singular'], style: { 'width': '30%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(projectSearch: SearchProject) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        project: projectSearch.project,
        macroproject: projectSearch.macroproject,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['project', 'create']
    }));
  }

  onEdit(project: Project) {
    this.store.dispatch(new fromCore.Go({
      path: ['project', project.project_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
