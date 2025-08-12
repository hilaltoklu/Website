import { Component } from '@angular/core';
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
  contrast 
} from 'ionicons/icons';

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
    IonLabel
  ]
})
export class MenuComponent {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController
  ) {
    addIcons({ 
      home, 
      person, 
      informationCircle,
      add,
      heart,
      language,
      contrast
    });
  }

  navigateToList() {
    this.menuController.close();
    this.router.navigate(['/list']);
  }

  navigateToLogin() {
    this.menuController.close();
    this.router.navigate(['/login']);
  }

  async showUserInfo() {
    this.menuController.close();
    
    const currentUser = sessionStorage.getItem('currentUser');
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
            <p style="margin-top: 15px; font-size: 12px; color: #666;">
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
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/kayitol']);
          }
        }
      ]
    });
    await alert.present();
  }

  async showFavorites() {
    this.menuController.close();
    
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      await this.showLoginRequiredAlert('favori yazılarınızı görmek');
      return;
    }

    // Basit favori sistem gösterimi (gerçek implementasyon için daha gelişmiş olabilir)
    const alert = await this.alertController.create({
      header: 'Favori Yazılarım',
      message: `
        <div style="text-align: center; padding: 20px;">
          <ion-icon name="heart-outline" style="font-size: 48px; color: #ff6b6b; margin-bottom: 10px;"></ion-icon>
          <p style="color: #666; margin-top: 10px;">
            Favori sistem henüz aktif değil.<br>
            Yakında sevdiğiniz yazıları favorilere ekleyebileceksiniz!
          </p>
        </div>
      `,
      buttons: ['Tamam']
    });
    await alert.present();
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
    
    const alert = await this.alertController.create({
      header: 'Tema Seçenekleri',
      inputs: [
        {
          name: 'theme',
          type: 'radio',
          label: 'Açık Tema (Light)',
          value: 'light',
          checked: true
        },
        {
          name: 'theme',
          type: 'radio',
          label: 'Koyu Tema (Dark)',
          value: 'dark'
        },
        {
          name: 'theme',
          type: 'radio',
          label: 'Sistem Ayarı',
          value: 'auto'
        }
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Uygula',
          handler: (data) => {
            this.applyTheme(data);
          }
        }
      ]
    });
    await alert.present();
  }

  async applyTheme(theme: string) {
    const themeNames: { [key: string]: string } = {
      'light': 'Açık Tema',
      'dark': 'Koyu Tema',
      'auto': 'Sistem Ayarı'
    };

    // Tema tercihi kaydet
    localStorage.setItem('selectedTheme', theme);

    const alert = await this.alertController.create({
      header: 'Tema Değiştirildi',
      message: `${themeNames[theme]} başarıyla uygulandı. Tam işlevsellik yakında eklenecek.`,
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async showAbout() {
    this.menuController.close();
    
    const alert = await this.alertController.create({
      header: 'Hakkında',
      message: `
        <div style="text-align: center; padding: 10px;">
          <h3 style="color: #3880ff; margin-bottom: 10px;">Makale Uygulaması</h3>
          <p style="font-size: 14px; color: #666; line-height: 1.4;">
            <strong>Sürüm:</strong> 1.0.0<br>
            <strong>Geliştirici:</strong> İonic & Angular<br>
            <strong>Açıklama:</strong> Makalelerinizi paylaşabileceğiniz modern bir platform.
          </p>
          <p style="font-size: 12px; color: #999; margin-top: 15px;">
            © 2025 Tüm hakları saklıdır.
          </p>
        </div>
      `,
      buttons: ['Tamam']
    });
    await alert.present();
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