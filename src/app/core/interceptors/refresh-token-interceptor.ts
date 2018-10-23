import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '@web/app/auth/services/auth.service';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { environment } from '@web/environments/environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errors: HttpErrorResponse) => {
        if (
          req.url !== environment.api.concat(environment.api) &&
          req.body.operationName !== null &&
          errors.error.error !== 'invalid_request'
        ) {
          const token: Token = this.authService.getToken();
          return this.authService.refreshToken(token).pipe(
            mergeMap((_token: Token) => {
              this.authService.setToken(_token);
              const request = req.clone({
                setHeaders: {
                  'Authorization': (_token) ? _token.token_type.concat(' ', _token.access_token) : ''
                }
              });
              return next.handle(request);
            }),
            catchError(() => {
              return Observable.throw('Error');
            })
          );
        } else {
          return Observable.throw('Error');
        }
      })
    );
  }

}
