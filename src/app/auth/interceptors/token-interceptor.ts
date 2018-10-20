import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '@web/app/auth/services/auth.service';

import { Token } from '@web/app/auth/models/token.model';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: Token = this.authService.getToken();
    const request = req.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': (token) ? token.token_type.concat(' ', token.access_token) : ''
      }
    });
    return next.handle(request);
  }

}
