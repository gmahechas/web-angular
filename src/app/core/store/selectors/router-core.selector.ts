import { getSelectors } from '@ngrx/router-store';
import * as fromCore from '@web/app/core/store/reducers';

export const {
  selectQueryParams,
  selectRouteParams,
  selectRouteData,
  selectUrl,
} = getSelectors(fromCore.getRouterState);
