import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { rocketOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {

  username!: string;
  password!: string;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ rocketOutline });
  }

  ngOnInit() {
    // For testing, you can pre-register a user.
    // localStorage.setItem('test', 'test');
  }

  async girisYap() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Kullanıcı adı ve şifre alanları boş bırakılamaz.',
        buttons: ['Tamam']
      });
      await alert.present();
      return;
    }

    const savedPassword = localStorage.getItem(this.username);

    if (savedPassword && this.password === savedPassword) {
      sessionStorage.setItem('currentUser', this.username);
      const alert = await this.alertController.create({
        header: 'Giriş Başarılı',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.router.navigate(['/list2']);
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Giriş Başarısız',
        message: 'E-posta veya şifre hatalı.',
        buttons: ['Tamam']
      });
      await alert.present();
    }
  }

  kayitOl() {
    this.router.navigate(['/signup']);
  }
}