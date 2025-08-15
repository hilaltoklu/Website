import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  // Uygulamanın başlangıç dilini ayarlama
  setInitialAppLanguage() {
    const language = localStorage.getItem('language') || 'en'; // Eğer dil yoksa varsayılan 'en' olsun
    this.translate.setDefaultLang(language);
    this.translate.use(language); // Kullanıcı dilini uygula
    localStorage.setItem('language', language); // Dil seçimi yerel depolamaya kaydedilsin
  }

  // Dil değiştirme fonksiyonu
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang); // Yeni dil yerel depolamaya kaydedilsin
  }
}
