import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromAuth from '../../../auth/store';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-core',
  templateUrl: './index-page-core.component.html',
  styles: []
})
export class IndexPageCoreComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  showSidebar: Observable<boolean>;
  menuItems: any[]; // TODO
  menuItems$: Observable<any[]>;
  blockedDocument$: Observable<boolean>;
  showSpinner$: Observable<boolean>;
  progressBar$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.loggedIn$ = store.pipe(select(fromAuth.getLoggedIn));
    this.showSidebar = store.pipe(select(fromStore.getShowSidebar));
    this.menuItems$ = store.pipe(select(fromStore.getMenuItems));
    this.menuItems = [
      {
        icon: '',
        label: 'Inicio',
        routerLink: 'dashboard',
        command: (() => this.opencloseSidebar(false))
      },
      {
        icon: 'fas fa-cog',
        label: 'Configuracion',
        items: [
          {
            label: 'Mantenimiento',
            items: [
              {
                label: 'Paises',
                routerLink: 'country',
                command: (() => this.opencloseSidebar(false))
              },
              {
                label: 'Estados',
                routerLink: 'estate',
                command: (() => this.opencloseSidebar(false))
              },
              {
                label: 'Ciudades',
                routerLink: 'city',
                command: (() => this.opencloseSidebar(false))
              },
              {
                label: 'Empresa',
                routerLink: 'company',
                command: (() => this.opencloseSidebar(false))
              },
              {
                label: 'Oficinas',
                routerLink: 'office',
                command: (() => this.opencloseSidebar(false))
              },
              {
                label: 'Personas',
                routerLink: 'person',
                command: (() => this.opencloseSidebar(false))
              },
            ]
          }
        ]
      }
    ];
    this.blockedDocument$ = store.pipe(select(fromStore.getBlockedDocument));
    this.showSpinner$ = store.pipe(select(fromStore.getShowSpinner));
    this.progressBar$ = store.pipe(select(fromStore.getProgressBar));
  }

  ngOnInit() {
  }

  opencloseSidebar(event: boolean) {
    if (event) {
      this.store.dispatch(new fromStore.OpenSidebar());
    } else if (!event) {
      this.store.dispatch(new fromStore.CloseSidebar());
    }
  }
}
