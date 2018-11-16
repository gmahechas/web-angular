import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/auth/graphql';

import { HttpClient } from '@angular/common/http';

import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';
import { User } from '@web/app/features/c/user/models/user.model';
import { Company } from '@web/app/features/b/company/models/company.model';

import { environment } from '@web/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private checkAuthGQL: fromGraphql.CheckAuthGQL,
    private logoutAuthGQL: fromGraphql.LogoutAuthGQL
  ) { }

  login(auth: Auth) {
    return this.httpClient.post<{ token: Token, user: User, company: Company }>(environment.api.concat(environment.login), auth);
  }

  refreshToken(token: Token) {
    return this.httpClient.post<Token>(environment.api.concat(environment.refresh), { refresh_token: token.refresh_token });
  }

  checkAuth() {
    return this.checkAuthGQL.watch().valueChanges;
  }

  logout() {
    return this.logoutAuthGQL.watch().valueChanges;
  }

}
