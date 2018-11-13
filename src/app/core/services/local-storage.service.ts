import { Injectable } from '@angular/core';

import { Token } from '@web/app/auth/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() { }

  setToken(token: Token) {
    localStorage.setItem('app_token', JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('app_token'));
  }

  removeToken() {
    localStorage.removeItem('app_token');
  }

  setLang(lang: string) {
    localStorage.setItem('app_lang', lang);
  }

  getLang() {
    return localStorage.getItem('app_lang');
  }

}
