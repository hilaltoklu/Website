import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected-language';
  private readonly DEFAULT_LANGUAGE = 'tr';
  private readonly AVAILABLE_LANGUAGES = ['en', 'tr']; // Desteklenen diller

  constructor(private translate: TranslateService) {}

  // Uygulamanın başlangıç dilini ayarlama
  setInitialAppLanguage(): void {
    const storedLanguage = this.getStoredLanguage();
    const browserLanguage = this.getBrowserLanguage();
    
    // Öncelik sırası: Kaydedilmiş dil -> Tarayıcı dili -> Varsayılan dil
    const language = storedLanguage || browserLanguage || this.DEFAULT_LANGUAGE;
    
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.applyLanguage(language);
  }

  // Dil değiştirme fonksiyonu
  changeLanguage(lang: string): void {
    if (this.isValidLanguage(lang)) {
      this.applyLanguage(lang);
    } else {
      console.warn(`Desteklenmeyen dil: ${lang}. Varsayılan dil kullanılıyor.`);
      this.applyLanguage(this.DEFAULT_LANGUAGE);
    }
  }

  // Mevcut dili al
  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  // Desteklenen dilleri al
  getAvailableLanguages(): string[] {
    return [...this.AVAILABLE_LANGUAGES];
  }

  // Private helper methods
  private applyLanguage(language: string): void {
    this.translate.use(language);
    this.saveLanguage(language);
  }

  private getStoredLanguage(): string | null {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('LocalStorage erişim hatası:', error);
      return null;
    }
  }

  private saveLanguage(language: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, language);
    } catch (error) {
      console.warn('LocalStorage kaydetme hatası:', error);
    }
  }

  private getBrowserLanguage(): string | null {
    const browserLang = navigator.language.split('-')[0];
    return this.isValidLanguage(browserLang) ? browserLang : null;
  }

  private isValidLanguage(lang: string): boolean {
    return this.AVAILABLE_LANGUAGES.includes(lang);
  }
}