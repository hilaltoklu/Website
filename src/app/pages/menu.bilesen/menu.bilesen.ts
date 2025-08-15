import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { 
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonButtons,
  IonButton,
  AlertController,
  MenuController,
  ModalController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { UserInfoEditModalPage } from 'src/app/pages/user.edit/user.edit';
import { 
  home, 
  person, 
  informationCircle, 
  add, 
  heart, 
  language, 
  contrast,
  sunny,
  moon,
  phonePortrait,
  languageOutline, // Bunu ekleyin

} from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme/theme.service';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.bilesen.html',
  styleUrls: ['./menu.bilesen.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonNote,
    IonButtons,
    IonButton,
    UserInfoEditModalPage,
    TranslateModule,
  
  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  private themeSubscription?: Subscription;
  currentTheme: ThemeType = 'light';
  isDarkMode: boolean = false;
  isLoggedIn$: Observable<string | null>;
  themeDisplayName$!: Observable<string>;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController,
    private themeService: ThemeService,
    private authService: AuthService,
    private modalController: ModalController,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.isLoggedIn$ = this.authService.currentUserObservable$;
    addIcons({
      home,
      person,
      informationCircle,
      add,
      heart,
      language,
      contrast,
      sunny,
      moon,
      phonePortrait,
      languageOutline // Bunu ekleyin

    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    this.themeDisplayName$ = combineLatest([
      this.themeService.theme$,
      this.translate.onLangChange.pipe(startWith({ lang: this.translate.currentLang }))
    ]).pipe(
      switchMap(([theme, langEvent]) => {
        const themeKey = theme === 'light' ? 'ALERTS.THEME_NAME_LIGHT' : 'ALERTS.THEME_NAME_DARK';
        return this.translate.get(themeKey);
      })
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  async showUserInfo() {
    this.menuController.close();

    const currentUser = this.authService.getCurrentUserValue();
    if (!currentUser) {
      const action = await this.translate.get('ALERTS.ACTION_EDIT_USER_INFO').toPromise();
      await this.showLoginRequiredAlert(action);
      return;
    }

    const userDataString = localStorage.getItem(currentUser);
    if (!userDataString) {
      this.translate.get(['ALERTS.ERROR_HEADER', 'ALERTS.ERROR_USER_DATA_NOT_FOUND', 'ALERTS.OK_BUTTON'])
        .subscribe(async (translations) => {
          const alert = await this.alertController.create({
            header: translations['ALERTS.ERROR_HEADER'],
            message: translations['ALERTS.ERROR_USER_DATA_NOT_FOUND'],
            buttons: [translations['ALERTS.OK_BUTTON']]
          });
          await alert.present();
        });
      return;
    }

    const userData = JSON.parse(userDataString);
    userData.username = currentUser;

    const modal = await this.modalController.create({
      component: UserInfoEditModalPage,
      componentProps: {
        userData: userData
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const oldUsername = this.authService.getCurrentUserValue();
      if (!oldUsername) return;

      const updatedUserData = { ...data };
      delete updatedUserData.username;

      this.authService.updateUser(oldUsername, data.username, updatedUserData);
    }
  }

  async showFavorites() {
    this.menuController.close();

    if (!this.authService.isLoggedIn()) {
      const action = await this.translate.get('ALERTS.ACTION_VIEW_FAVORITES').toPromise();
      await this.showLoginRequiredAlert(action);
      return;
    }
    this.router.navigate(['/favorites']);
  }

  async showLanguageOptions() {
    this.menuController.close();
    const currentLang = this.languageService.getCurrentLanguage();

    this.translate.get([
      'ALERTS.LANGUAGE_OPTIONS_HEADER',
      'ALERTS.LANGUAGE_TURKISH',
      'ALERTS.LANGUAGE_ENGLISH',
      'ALERTS.CANCEL_BUTTON',
      'ALERTS.SELECT_BUTTON'
    ]).subscribe(async (translations) => {
      const alert = await this.alertController.create({
        header: translations['ALERTS.LANGUAGE_OPTIONS_HEADER'],
        inputs: [
          {
            name: 'language',
            type: 'radio',
            label: translations['ALERTS.LANGUAGE_TURKISH'],
            value: 'tr',
            checked: currentLang === 'tr',
          },
          {
            name: 'language',
            type: 'radio',
            label: translations['ALERTS.LANGUAGE_ENGLISH'],
            value: 'en',
            checked: currentLang === 'en',
          },
        ],
        buttons: [
          {
            text: translations['ALERTS.CANCEL_BUTTON'],
            role: 'cancel',
          },
          {
            text: translations['ALERTS.SELECT_BUTTON'],
            handler: (data) => {
              if (data) {
                this.languageService.changeLanguage(data);
              }
            },
          },
        ],
      });
      await alert.present();
    });
  }

  async showThemeOptions() {
    this.menuController.close();
    this.themeService.debugCurrentTheme();
    const currentTheme = this.themeService.getCurrentTheme();

    this.translate.get([
      'ALERTS.THEME_OPTIONS_HEADER',
      'ALERTS.THEME_OPTIONS_MESSAGE',
      'ALERTS.THEME_LIGHT',
      'ALERTS.THEME_DARK',
      'ALERTS.CANCEL_BUTTON',
      'ALERTS.APPLY_BUTTON'
    ]).subscribe(async (translations) => {
      const alert = await this.alertController.create({
        header: translations['ALERTS.THEME_OPTIONS_HEADER'],
        message: translations['ALERTS.THEME_OPTIONS_MESSAGE'],
        inputs: [
          {
            name: 'theme',
            type: 'radio',
            label: translations['ALERTS.THEME_LIGHT'],
            value: 'light',
            checked: currentTheme === 'light'
          },
          {
            name: 'theme',
            type: 'radio',
            label: translations['ALERTS.THEME_DARK'],
            value: 'dark',
            checked: currentTheme === 'dark'
          },
        ],
        buttons: [
          {
            text: translations['ALERTS.CANCEL_BUTTON'],
            role: 'cancel'
          },
          {
            text: translations['ALERTS.APPLY_BUTTON'],
            handler: (selectedTheme: ThemeType) => {
              this.applyTheme(selectedTheme);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async applyTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);

    const themeNameKey = theme === 'light' ? 'ALERTS.THEME_LIGHT' : 'ALERTS.THEME_DARK';

    this.translate.get([
      'ALERTS.THEME_APPLIED_HEADER',
      'ALERTS.THEME_APPLIED_MESSAGE',
      'ALERTS.AWESOME_BUTTON',
      themeNameKey
    ]).subscribe(async (translations) => {
      const themeName = translations[themeNameKey];
      const message = translations['ALERTS.THEME_APPLIED_MESSAGE'].replace('{{themeName}}', themeName);

      const alert = await this.alertController.create({
        header: translations['ALERTS.THEME_APPLIED_HEADER'],
        message: message,
        buttons: [translations['ALERTS.AWESOME_BUTTON']]
      });
      await alert.present();
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  private async showLoginRequiredAlert(action: string) {
    this.translate.get([
      'ALERTS.LOGIN_REQUIRED_HEADER',
      'ALERTS.LOGIN_REQUIRED_MESSAGE',
      'ALERTS.CANCEL_BUTTON',
      'ALERTS.LOGIN_BUTTON'
    ], { action: action }).subscribe(async (translations) => {
      const alert = await this.alertController.create({
        header: translations['ALERTS.LOGIN_REQUIRED_HEADER'],
        message: translations['ALERTS.LOGIN_REQUIRED_MESSAGE'],
        buttons: [
          {
            text: translations['ALERTS.CANCEL_BUTTON'],
            role: 'cancel'
          },
          {
            text: translations['ALERTS.LOGIN_BUTTON'],
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}