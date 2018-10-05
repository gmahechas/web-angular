import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';

import { environment } from '@web/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(auth: Auth) {
    return this.httpClient.post(
      environment.apilUrl + environment.oauthUrl, {
        grant_type: 'password',
        ...environment.oauth,
        ...auth
      }
    );
  }

  refreshToken(refreshToken: Token) {
    console.log('refresh->', refreshToken);
    return this.httpClient.post(
      environment.apilUrl + environment.oauthUrl, {
        grant_type: 'refresh_token',
        ...environment.oauth,
        refresh_token: refreshToken.refresh_token
      }
    );
  }

  setToken(token: Token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
