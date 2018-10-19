import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/auth/store';

import { AuthService } from '@web/app/auth/services/auth.service';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromStore.State>,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: Token = JSON.parse(localStorage.getItem('mavatec'));
    return next.handle(req).pipe(
      catchError((errors: HttpErrorResponse) => {

        if (errors.status === 401) {
          this.authService.refreshToken(token).pipe(
            switchMap((_token: Token) => {
              const request = req.clone({
                setHeaders: {
                  'Authorization': (_token) ? _token.token_type.concat(' ', _token.access_token) : ''
                }
              });
              return next.handle(request);
            })
          );
        }
        return Observable.throw(errors);
      })
    );
  }

}
