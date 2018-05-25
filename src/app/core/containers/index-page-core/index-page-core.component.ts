import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromAuth from '../../../auth/store';

import { MenuItem } from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-index-page-core',
  templateUrl: './index-page-core.component.html',
  styleUrls: ['./index-page-core.component.scss']
})
export class IndexPageCoreComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  blockedDocument$: Observable<boolean>;
  menuItems: MenuItem[]; // TODO

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.loggedIn$ = store.pipe(select(fromAuth.getLoggedIn));
    this.showSidenav$ = store.pipe(select(fromStore.getShowSidenav));
    this.blockedDocument$ = store.pipe(select(fromStore.getBlockedDocument));
    this.menuItems = [
      {
        icon: '',
        label: 'Inicio',
        routerLink: 'dashboard',
        command: (() => this.showSidenav(false))
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
                command: (() => this.showSidenav(false))
              },
              {
                label: 'Estados',
                routerLink: 'state',
                command: (() => this.showSidenav(false))
              }
            ]
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  showSidenav(event: boolean) {
    if (event) {
      this.store.dispatch(new fromStore.OpenSidenav());
    } else if (!event) {
      this.store.dispatch(new fromStore.CloseSidenav());
    }
  }
}
