import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromTypePersonIdentification from '@web/app/features/c/type-person-identification/store';
import * as fromCore from '@web/app/core/store';

import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';
import {
  SearchTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/search-type-person-identification.model';
import {
  SelectedTypePersonIdentification,
  initialStateSelectedTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/selected-type-person-identification.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-type-person-identification',
  templateUrl: './index-page-type-person-identification.component.html',
  styles: []
})
export class IndexPageTypePersonIdentificationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: TypePersonIdentification;

  query$ = this.store.pipe(select(fromTypePersonIdentification.getQuery));

  data$ = this.store.pipe(select(fromTypePersonIdentification.getAllEntities));
  total$ = this.store.pipe(select(fromTypePersonIdentification.getTotal));
  perPage$ = this.store.pipe(select(fromTypePersonIdentification.getPerPage));
  from$ = this.store.pipe(select(fromTypePersonIdentification.getFrom));
  to$ = this.store.pipe(select(fromTypePersonIdentification.getTo));
  configTable: any;

  constructor(
    private store: Store<fromTypePersonIdentification.State>
  ) {
    this.configTable = {
      dataKey: 'type_person_identification_id',
      cols: [
        {
          fields: ['type_person_identification_id'],
          header: ['type_person_identification.model.type_person_identification_id'],
          style: { width: '5%' }
        },
        {
          fields: ['type_person_identification_code'],
          header: ['type_person_identification.model.type_person_identification_code'],
          style: { width: '25%' }
        },
        {
          fields: ['type_person_identification_description'],
          header: ['type_person_identification.model.type_person_identification_description'],
          style: { width: '70%' }
        },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromTypePersonIdentification.getSelected), take(1)).subscribe(
      (selected: SelectedTypePersonIdentification) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['type-person-identification', selected.selectedEntity.type_person_identification_id]
          }));
        }
      }
    );
  }

  onLoad(typePersonIdentificationSearch: SearchTypePersonIdentification) {
    this.store.dispatch(new fromTypePersonIdentification.LoadEntity({
      search: {
        ...typePersonIdentificationSearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromTypePersonIdentification.SetSelect({ selected: initialStateSelectedTypePersonIdentification }));
    this.store.dispatch(new fromCore.Go({
      path: ['type-person-identification', 'create']
    }));
  }

  onEdit(typePersonIdentification: TypePersonIdentification) {
    this.store.dispatch(new fromTypePersonIdentification.SetSelect({
      selected: { ...initialStateSelectedTypePersonIdentification, selectedEntity: typePersonIdentification }
    }));
    this.store.dispatch(new fromCore.Go({
      path: ['type-person-identification', typePersonIdentification.type_person_identification_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromTypePersonIdentification.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromTypePersonIdentification.SetSelect({ selected: initialStateSelectedTypePersonIdentification }));
    this.store.dispatch(new fromCore.Go({
      path: ['type-person-identification']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromTypePersonIdentification.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
