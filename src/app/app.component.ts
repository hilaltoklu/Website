import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './pages/services/theme/theme.service';
import { MenuComponent } from './pages/menu.bilesen/menu.bilesen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Tema servisini başlat
    this.themeService.setTheme(this.themeService.getCurrentTheme());
  }
}
