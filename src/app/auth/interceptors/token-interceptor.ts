import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/auth/store';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromStore.State>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== 'http://local.dev.co/laravel/api/public/api/auth/refresh') {
      return this.store.pipe(
        take(1),
        select(fromStore.getToken),
        switchMap((_token: Token) => {
          const request = req.clone({
            setHeaders: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': (_token) ? _token.token_type.concat(' ', _token.access_token) : ''
            }
          });
          return next.handle(request);
        })
      );
    }
  }

}
