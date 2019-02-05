import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@web/app/auth/services/auth.service';
import { LocalStorageService } from '@web/app/core/services/local-storage.service';

import { Store } from '@ngrx/store';
import * as fromAuth from '@web/app/auth/store';

import { Token } from '@web/app/auth/models/token.model';

import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { environment } from '@web/environments/environment';

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
        if (
          req.url !== environment.api.concat(environment.api) &&
          req.body.operationName !== null &&
          errors.error.error !== 'invalid_request'
        ) {
          const token: Token = this.localStorageService.getToken();
          return this.authService.refreshToken(token).pipe(
            mergeMap((newToken: Token) => {
              this.localStorageService.setToken(newToken);
              const request = req.clone({
                setHeaders: {
                  Authorization: (newToken) ? newToken.token_type.concat(' ', newToken.access_token) : ''
                }
              });
              return next.handle(request);
            }),
            catchError((error) => {
              this.store.dispatch(new fromAuth.ExpiredAuth());
              this.localStorageService.setUserOffice(null);
              this.localStorageService.setUserOfficeProject(null);
              return throwError('Error');
            })
          );
        } else {
          return throwError('Error');
        }
      })
    );
  }

}
