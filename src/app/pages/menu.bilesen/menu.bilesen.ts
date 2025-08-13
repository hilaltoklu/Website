import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  MenuController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
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
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

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
    IonButton
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
    private authService: AuthService
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
      await this.showLoginRequiredAlert('kullanıcı bilgilerini görüntülemek');
      return;
    }

    const userDataString = localStorage.getItem(currentUser);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const genderText = userData.gender === 'female' ? 'Kadın' : 'Erkek';
      
      const alert = await this.alertController.create({
        header: 'Kullanıcı Bilgileri',
        message: `
          <div style="text-align: left; padding: 10px;">
            <p><strong>Kullanıcı Adı:</strong> ${currentUser}</p>
            <p><strong>Cinsiyet:</strong> ${genderText}</p>
            <p style="margin-top: 15px; font-size: 12px; color: var(--text-secondary);">
              Bilgilerinizi değiştirmek için hesabınızı yeniden oluşturmanız gerekir.
            </p>
          </div>
        `,
        buttons: [
          {
            text: 'Tamam',
            role: 'cancel'
          },
          {
            text: 'Bilgileri Değiştir',
            handler: () => {
              this.showChangeUserInfoOptions();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async showChangeUserInfoOptions() {
    const alert = await this.alertController.create({
      header: 'Bilgileri Değiştir',
      message: 'Kullanıcı bilgilerinizi değiştirmek için mevcut hesabınızdan çıkış yapıp yeni bir hesap oluşturmanız gerekir.',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Çıkış Yap ve Yeni Hesap Oluştur',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/kayitol']);
          }
        }
      ]
    });
    await alert.present();
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
    
    const alert = await this.alertController.create({
      header: 'Dil Seçenekleri',
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: 'Türkçe',
          value: 'tr',
          checked: true
        },
        {
          name: 'language',
          type: 'radio',
          label: 'English',
          value: 'en'
        },
        {
          name: 'language',
          type: 'radio',
          label: 'Deutsch',
          value: 'de'
        }
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Seç',
          handler: (data) => {
            this.showLanguageChangeAlert(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async showLanguageChangeAlert(selectedLanguage: string) {
    const languageNames: { [key: string]: string } = {
      'tr': 'Türkçe',
      'en': 'English',
      'de': 'Deutsch'
    };

    const alert = await this.alertController.create({
      header: 'Dil Değiştirildi',
      message: `Dil ${languageNames[selectedLanguage]} olarak ayarlandı. Bu özellik yakında aktif olacak.`,
      buttons: ['Tamam']
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
          label: 'Açık Tema',
          value: 'light',
          checked: currentTheme === 'light'
        },
        {
          name: 'theme',
          type: 'radio',
          label: 'Koyu Tema',
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
      'light': 'Açık Tema',
      'dark': 'Koyu Tema',
      'auto': 'Sistem Ayarı'
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
      'light': 'Açık',
      'dark': 'Koyu', 
      'auto': 'Sistem'
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