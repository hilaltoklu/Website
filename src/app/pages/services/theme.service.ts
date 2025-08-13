import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeType>('light');
  public theme$ = this.currentTheme.asObservable();

  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    this.initializeTheme();
    this.listenToSystemThemeChanges();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeType;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: ThemeType) {
    this.currentTheme.next(theme);
    localStorage.setItem('selectedTheme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeType) {
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    body.classList.remove('dark-theme', 'light-theme');
    
    let shouldBeDark = false;
    
    switch (theme) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'auto':
        shouldBeDark = prefersDark;
        break;
    }
    
    if (shouldBeDark) {
      body.classList.add('dark-theme');
      document.documentElement.setAttribute('color-scheme', 'dark');
    } else {
      body.classList.add('light-theme');
      document.documentElement.setAttribute('color-scheme', 'light');
    }
    
    this.isDarkMode.next(shouldBeDark);
    this.updateStatusBarStyle(shouldBeDark);
  }

  private updateStatusBarStyle(isDark: boolean) {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    const metaStatusBarStyle = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]');
    
    if (isDark) {
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#1a1a1a');
      }
      if (metaStatusBarStyle) {
        metaStatusBarStyle.setAttribute('content', 'black-translucent');
      }
    } else {
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#3880ff');
      }
      if (metaStatusBarStyle) {
        metaStatusBarStyle.setAttribute('content', 'default');
      }
    }
  }

  getCurrentTheme(): ThemeType {
    return this.currentTheme.value;
  }

  getCurrentIsDarkMode(): boolean {
    return this.isDarkMode.value;
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme: ThemeType = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private listenToSystemThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (this.getCurrentTheme() === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  debugCurrentTheme() {
    console.log('Current Theme:', this.getCurrentTheme());
    console.log('Is Dark Mode:', this.getCurrentIsDarkMode());
    console.log('Body Classes:', document.body.classList.toString());
    console.log('HTML color-scheme:', document.documentElement.getAttribute('color-scheme'));
  }
}