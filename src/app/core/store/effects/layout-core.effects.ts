import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCoreReducers from '@web/app/core/store/reducers';
import * as fromCoreActions from '@web/app/core/store/actions';

import { LocalStorageService } from '@web/app/core/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { defer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCoreEffects {

  @Effect({ dispatch: false })
  setDefaultLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetDefaultLang),
    map((action: fromCoreActions.SetDefaultLang) => action.payload.lang),
    tap((lang: string) => {
      this.translate.setDefaultLang(lang);
    })
  );

  @Effect({ dispatch: false })
  changeLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ChangeLang),
    map((action: fromCoreActions.ChangeLang) => action.payload.lang),
    tap((lang: string) => {
      this.translate.use(lang);
    })
  );

  @Effect({ dispatch: false })
  showMessages$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ShowMessages),
    map((action: fromCoreActions.ShowMessages) => action.payload.messages),
    tap((message: any[]) => {
      this.messageService.addAll(message);
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of([
      this.localStorageService.getLang(),
      this.localStorageService.getOffice(),
      this.localStorageService.getProject()
    ]);
  }).pipe(
    tap(([lang, office, project]) => {

      if (lang) {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang }));
      } else {
        this.localStorageService.setLang('es-co');
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang: 'es-co' }));
      }

      if (office) {
        this.store.dispatch(new fromCoreActions.SetOffice({ office: JSON.parse(office) }));
      } else {
        this.localStorageService.setOffice(JSON.parse(office));
      }

      if (project) {
        this.store.dispatch(new fromCoreActions.SetProject({ project: JSON.parse(project) }));
      } else {
        this.localStorageService.setProject(JSON.parse(office));
      }

    })
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store<fromCoreReducers.State>,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }
}
