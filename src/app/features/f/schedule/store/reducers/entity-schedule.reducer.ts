import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';
import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';

export interface State extends EntityState<Schedule> { }

export const adapter: EntityAdapter<Schedule> = createEntityAdapter<Schedule>({
  selectId: (entity: Schedule) => entity.schedule_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromScheduleActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationSchedule.data, state)
  ),
  on(
    fromScheduleActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromScheduleActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeSchedule, newState);
    }
  ),
  on(
    fromScheduleActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateSchedule.schedule_id, changes: entity.updateSchedule }, state)
  ),
  on(
    fromScheduleActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroySchedule.schedule_id, state)
  ),
  on(
    fromScheduleActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
