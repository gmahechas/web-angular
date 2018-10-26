import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {

  constructor() { }

  setLang(lang: string) {
    localStorage.setItem('mavatec_lang', lang);
  }

  getLang() {
    return localStorage.getItem('mavatec_lang');
  }

}
