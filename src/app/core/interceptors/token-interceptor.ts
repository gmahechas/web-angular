import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';

import { environment } from '@web/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      req.url !== environment.api.concat(environment.login) &&
      req.url !== environment.api.concat(environment.refresh)
    ) {
      const token: Token = this.localStorageService.getToken();
      const request = req.clone({
        setHeaders: {
          Authorization: (token) ? token.token_type.concat(' ', token.access_token) : ''
        }
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }

}
