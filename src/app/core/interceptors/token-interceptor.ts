import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '@web/app/auth/services/auth.service';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';

import { environment } from '@web/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      req.url !== environment.api.concat(environment.login) &&
      req.url !== environment.api.concat(environment.refresh)
    ) {
      const token: Token = this.authService.getToken();
      const request = req.clone({
        setHeaders: {
          'Authorization': (token) ? token.token_type.concat(' ', token.access_token) : ''
        }
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }

}
