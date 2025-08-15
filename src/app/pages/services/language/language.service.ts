import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  setInitialAppLanguage() {
    let language = localStorage.getItem('language');
    if (language) {
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('language', 'en');
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
