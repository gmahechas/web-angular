import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/auth/graphql';

import { HttpClient } from '@angular/common/http';
import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';
import { CheckAuth } from '@web/app/auth/models/check-auth.model';
import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

import { environment } from '@web/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  queryRef: QueryRef<CheckAuth>;

  constructor(
    private httpClient: HttpClient,
    private checkAuthGQL: fromGraphql.CheckAuthGQL
  ) { }

  login(auth: Auth) {
    return this.httpClient.post<{ token: Token, user: User, company: Company }>(environment.apilUrl + environment.loginUrl, auth);
  }

  refreshToken(token: Token) {
    return this.httpClient.post<Token>(environment.apilUrl + environment.refreshUrl, { refresh_token: token.refresh_token });
  }

  checkAuth() {
    return this.checkAuthGQL.watch().valueChanges;
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
