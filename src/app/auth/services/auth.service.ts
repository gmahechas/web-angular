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
    return this.httpClient.post<Token>(environment.apilUrl + environment.loginUrl, auth);
  }

  refreshToken(refreshToken: Token) {
    console.log('refresh->', refreshToken);
    return this.httpClient.post(environment.apilUrl + environment.loginUrl, { refresh_token: refreshToken.refresh_token }
    );
  }

  currentUser(auth: Auth, token: Token) {

  }

  setToken(token: Token) {
    localStorage.setItem('mavatec', JSON.stringify({ token: token }));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('token'));
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
