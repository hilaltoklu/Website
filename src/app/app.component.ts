import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './pages/services/theme/theme.service';
import { MenuComponent } from './pages/menu.bilesen/menu.bilesen';
import { LanguageService } from './pages/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent], // Standalone componentler burada belirtilmiş
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Tema servisini başlat
    this.themeService.setTheme(this.themeService.getCurrentTheme());
    // Dil servisini başlat
    this.languageService.setInitialAppLanguage();
  }
}
