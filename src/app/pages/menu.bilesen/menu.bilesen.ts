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
  phonePortrait
} from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme/theme.service';
import { Subscription, Observable } from 'rxjs';
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
    TranslateModule

  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  private themeSubscription?: Subscription;
  currentTheme: ThemeType = 'light';
  isDarkMode: boolean = false;
  isLoggedIn$: Observable<string | null>;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController,
    private themeService: ThemeService,
    private authService: AuthService,
    private modalController: ModalController,
    private languageService: LanguageService
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
      phonePortrait
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
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
      await this.showLoginRequiredAlert('kullanıcı bilgilerini düzenlemek');
      return;
    }
  
    const userDataString = localStorage.getItem(currentUser);
    if (!userDataString) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Kullanıcı verileri bulunamadı.',
        buttons: ['Tamam']
      });
      await alert.present();
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
      delete updatedUserData.username; // a new password is not required
      
      this.authService.updateUser(oldUsername, data.username, updatedUserData);
    }
  }

  async showFavorites() {
    this.menuController.close();
    
    if (!this.authService.isLoggedIn()) {
      await this.showLoginRequiredAlert('favori yazılarınızı görmek');
      return;
    }
    this.router.navigate(['/favorites']);

   
  }

  async showLanguageOptions() {
    this.menuController.close();
    const currentLang = localStorage.getItem('language') || 'en';

    const alert = await this.alertController.create({
      header: 'Dil Seçenekleri',
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: 'Türkçe',
          value: 'tr',
          checked: currentLang === 'tr',
        },
        {
          name: 'language',
          type: 'radio',
          label: 'English',
          value: 'en',
          checked: currentLang === 'en',
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
        },
        {
          text: 'Seç',
          handler: (data) => {
            if (data) {
              this.languageService.changeLanguage(data);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async showThemeOptions() {
    this.menuController.close();
    
    this.themeService.debugCurrentTheme();
    
    const currentTheme = this.themeService.getCurrentTheme();
    
    const alert = await this.alertController.create({
      header: 'Tema Seçenekleri',
      message: 'Uygulamanın görünümünü değiştirin:',
      inputs: [
        {
          name: 'theme',
          type: 'radio',
          label: 'Aydınlık Tema',
          value: 'light',
          checked: currentTheme === 'light'
        },
        {
          name: 'theme',
          type: 'radio',
          label: 'Karanlık Tema',
          value: 'dark',
          checked: currentTheme === 'dark'
        },
        
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Uygula',
          handler: (selectedTheme: ThemeType) => {
            this.applyTheme(selectedTheme);
          }
        }
      ]
    });
    await alert.present();
  }

  async applyTheme(theme: ThemeType) {
    const themeNames: { [key: string]: string } = {
      'light': 'Aydınlık Tema',
      'dark': 'Karanlık Tema',
    };

    this.themeService.setTheme(theme);

    const alert = await this.alertController.create({
      header: 'Tema Uygulandı',
      message: `${themeNames[theme]} başarıyla uygulandı!`,
      buttons: ['Harika!']
    });
    await alert.present();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getThemeDisplayName(): string {
    const themeNames: { [key: string]: string } = {
      'light': 'Aydınlık',
      'dark': 'Karanlık', 
    };
    return themeNames[this.currentTheme] || 'Bilinmiyor';
  }

  private async showLoginRequiredAlert(action: string) {
    const alert = await this.alertController.create({
      header: 'Giriş Gerekli',
      message: `${action} için önce giriş yapmanız gerekiyor. Şu an giriş sayfasına yönlendiriliyorsunuz.`,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Giriş Yap',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}