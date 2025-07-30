import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {

  username: string = 'test';
  password: string = 'test';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    // Örnek kullanıcı adı ve şifre oluştur
    localStorage.setItem('user', 'test');
    localStorage.setItem('pass', 'test');
  }

  async girisYap() {
    // Güvenlik Uyarısı: Bu yöntem üretim ortamları için güvenli değildir.
    // Gerçek bir uygulamada, bir kimlik doğrulama sunucusu kullanılmalıdır.
    const savedUsername = localStorage.getItem('user');
    const savedPassword = localStorage.getItem('pass');

    if (!savedUsername || !savedPassword) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Kayıtlı kullanıcı bulunamadı.',
        buttons: ['Tamam']
      });
      await alert.present();
      return;
    }

    if (this.username === savedUsername && this.password === savedPassword) {
      const alert = await this.alertController.create({
        header: 'Giriş Başarılı',
        message: 'Listeleme sayfasına yönlendiriliyorsunuz.',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.router.navigate(['/list']);
            }
          }
        ]
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Giriş Başarısız',
        message: 'Kullanıcı adı veya şifre hatalı.',
        buttons: ['Tamam']
      });

      await alert.present();
    }
  }
}
