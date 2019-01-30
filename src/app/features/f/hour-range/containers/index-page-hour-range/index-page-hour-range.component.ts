import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';
import { SearchHourRange } from '@web/app/features/f/hour-range/models/search-hour-range.model';
import { initialStateSelectedHourRange } from '@web/app/features/f/hour-range/models/selected-hour-range.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-hour-range',
  templateUrl: './index-page-hour-range.component.html',
  styles: []
})
export class IndexPageHourRangeComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: HourRange;

  query$ = this.store.pipe(select(fromHourRange.getQuery, take(1)));

  data$ = this.store.pipe(select(fromHourRange.getAllEntities));
  total$ = this.store.pipe(select(fromHourRange.getTotal));
  perPage$ = this.store.pipe(select(fromHourRange.getPerPage));
  from$ = this.store.pipe(select(fromHourRange.getFrom));
  to$ = this.store.pipe(select(fromHourRange.getTo));
  configTable: any;

  constructor(
    private store: Store<fromHourRange.State>
  ) {
    this.configTable = {
      dataKey: 'hour_range_id',
      cols: [
        { fields: ['hour_range_id'], header: ['hour_range.model.hour_range_id'], style: { width: '5%' } },
        { fields: ['hour_range_name'], header: ['hour_range.model.hour_range_name'], style: { width: '55%' } },
        { fields: ['hour_range_start'], header: ['hour_range.model.hour_range_start'], style: { width: '20%' } },
        { fields: ['hour_range_end'], header: ['hour_range.model.hour_range_end'], style: { width: '20%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromHourRange.getSelected), take(1)).subscribe(
      (selected: { selectedEntity: HourRange | null }) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['hour_range', selected.selectedEntity.hour_range_id]
          }));
        }
      }
    );
  }

  onLoad(hourRangeSearch: SearchHourRange) {
    this.store.dispatch(new fromHourRange.LoadEntity({
      search: {
        hour_range: hourRangeSearch.hour_range,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromHourRange.SetSelected({ selected: initialStateSelectedHourRange }));
    this.store.dispatch(new fromCore.Go({
      path: ['hour_range', 'create']
    }));
  }

  onEdit(hourRange: HourRange) {
    this.store.dispatch(new fromHourRange.SetSelected({ selected: { ...initialStateSelectedHourRange, selectedEntity: hourRange } }));
    this.store.dispatch(new fromCore.Go({
      path: ['hour_range', hourRange.hour_range_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromHourRange.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromHourRange.SetSelected({ selected: initialStateSelectedHourRange }));
    this.store.dispatch(new fromCore.Go({
      path: ['hour_range']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromHourRange.Reset());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
