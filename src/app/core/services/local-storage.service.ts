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

  setOffice(office) {
    localStorage.setItem('app_office', office);
  }

  getOffice() {
    return localStorage.getItem('app_office');
  }

  setProject(project) {
    localStorage.setItem('app_project', project);
  }

  getProject() {
    return localStorage.getItem('app_project');
  }

}
