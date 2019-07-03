import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@web/app/auth/services/auth.service';
import { LocalStorageService } from '@web/app/core/services/local-storage.service';

import { Store } from '@ngrx/store';
import * as fromAuth from '@web/app/auth/store';

import { Token } from '@web/app/auth/models/token.model';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromAuth.State>,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errors: HttpErrorResponse) => {
        if (errors.status !== 0) {
          if (errors.error.error === 'no_authenticated') {
            const token: Token = this.localStorageService.getToken();

            return this.authService.refreshToken(token).pipe(
              switchMap((newToken: Token) => {
                this.localStorageService.setToken(newToken);
                const request = req.clone({
                  setHeaders: {
                    Authorization: (newToken) ? newToken.token_type.concat(' ', newToken.access_token) : ''
                  }
                });
                return next.handle(request);
              }),
              catchError((newErrors) => {
                this.store.dispatch(fromAuth.AuthActions.ExpiredAuth());
                this.localStorageService.setUserOffice(null);
                this.localStorageService.setUserOfficeProject(null);
                return throwError(newErrors);
              })
            );
          } else {
            return throwError(errors);
          }
        } else {
          return throwError(errors);
        }
      })
    );
  }

}
