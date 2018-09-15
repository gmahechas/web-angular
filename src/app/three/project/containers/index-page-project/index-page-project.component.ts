import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromCore from './../../../../core/store';

import { Project } from './../../models/project.model';
import { SearchProject } from './../../models/search-project.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-project',
  templateUrl: './index-page-project.component.html',
  styles: []
})
export class IndexPageProjectComponent implements OnInit {

  query$: Observable<SearchProject>;

  data$: Observable<Project[]>;
  total$: Observable<number>;
  perPage$: Observable<number>;
  from$: Observable<number>;
  to$: Observable<number>;
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.data$ = store.pipe(select(fromStore.getAllEntities));
    this.query$ = store.pipe(select(fromStore.getQuery));
    this.total$ = store.pipe(select(fromStore.getTotal));
    this.perPage$ = store.pipe(select(fromStore.getPerPage));
    this.from$ = store.pipe(select(fromStore.getFrom));
    this.to$ = store.pipe(select(fromStore.getTo));
    this.configTable = {
      dataKey: 'project_id',
      cols: [
        { fields: ['project_id'], header: 'Id', style: { 'width': '5%' } },
        { fields: ['project_name'], header: 'Proyecto', style: { 'width': '25%' } },
        { fields: ['project_address'], header: 'Direccion', style: { 'width': '25%' } },
        { fields: ['project_phone'], header: 'Telefono', style: { 'width': '15%' } },
        { fields: ['macroproject.macroproject_name'], header: 'Macro Proyecto', style: { 'width': '30%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(projectSearch: SearchProject) {
    this.store.dispatch(new fromStore.LoadEntity({
      project: projectSearch.project,
      macroproject: projectSearch.macroproject,
      limit: 20,
      page: 1
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
    this.store.dispatch(new fromStore.PaginateEntity(event.page + 1));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['project']
    }));
  }

}
