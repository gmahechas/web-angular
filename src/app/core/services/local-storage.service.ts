import { Injectable } from '@angular/core';

import { Token } from '@web/app/auth/models/token.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() { }

  setLang(lang: string) {
    localStorage.setItem('app_lang', lang);
  }

  getLang() {
    return localStorage.getItem('app_lang');
  }

  setToken(token: Token) {
    localStorage.setItem('app_token', JSON.stringify(token));
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('app_token'));
  }

  removeToken() {
    localStorage.removeItem('app_token');
  }

  setUserOffice(userOffice) {
    localStorage.setItem('app_user_office', JSON.stringify(userOffice));
  }

  getUserOffice() {
    return JSON.parse(localStorage.getItem('app_user_office'));
  }

  setUserOfficeProject(project) {
    localStorage.setItem('app_user_office_project', JSON.stringify(project));
  }

  getUserOfficeProject() {
    return JSON.parse(localStorage.getItem('app_user_office_project'));
  }

}
