
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';
import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

import { environment } from '@web/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(auth: Auth) {
    return this.httpClient.post<{ token: Token, user: User, company: Company }>(environment.apilUrl + environment.loginUrl, auth);
  }

  refreshToken(token: Token) {
    return this.httpClient.post<Token>(environment.apilUrl + environment.refreshUrl, { refresh_token: token.refresh_token });
  }

  currentUser(auth: Auth, token: Token) {

  }

  setToken(token: Token) {
    localStorage.setItem('mavatec', JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('mavatec'));
  }

  removeToken() {
    localStorage.removeItem('mavatec');
  }
}
