import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/auth/store';

import { AuthService } from '@web/app/auth/services/auth.service';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';
import { tap, take, catchError, switchMap, flatMap } from 'rxjs/operators';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromStore.State>,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((errors: HttpErrorResponse) => {

        if (errors.status === 401) {
          return this.store.pipe(
            take(1),
            select(fromStore.getToken),
            switchMap((_token: Token) => {
              console.log(_token);
              return this.authService.refreshToken(_token)
                .pipe(
                  switchMap(_token2 => {
                    console.log('2', _token2);
                    this.store.dispatch(new fromStore.RefreshToken({ token: _token2 }));
                    const newrequest = req.clone({
                      setHeaders: {
                        'Authorization': (_token2) ? _token2.token_type.concat(' ', _token2.access_token) : ''
                      }
                    });
                    return next.handle(newrequest);
                  })
                );
            })
          );
        }
        return Observable.throw(errors);
      })
    );



  }

}
