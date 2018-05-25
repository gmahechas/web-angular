import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


import { AuthService } from '../../auth/services';
import { Token } from '../../auth/models/token.model';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  token: Token;

  constructor(
/*     private authService: AuthService */
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

/*     this.token = this.authService.getToken();
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.token.token_type} ${this.token.access_token}`
        }
      });
    } */
    return next.handle(request);
  }
}
