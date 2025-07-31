import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {

  username!: string;
  password!: string;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  async kayitOl() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Kullanıcı adı ve şifre alanları boş bırakılamaz.',
        buttons: ['Tamam']
      });
      await alert.present();
      return;
    }

    const existingUser = localStorage.getItem(this.username);
    if (existingUser) {
      const alert = await this.alertController.create({
        header: 'Hata',
        message: 'Bu kullanıcı adı zaten kullanılıyor.',
        buttons: ['Tamam']
      });
      await alert.present();
    } else {
      localStorage.setItem(this.username, this.password);
      const alert = await this.alertController.create({
        header: 'Başarılı',
        message: 'Kayıt işlemi başarılı.',
        buttons: [
          {
            text: 'Tamam',
            handler: () => {
              this.router.navigate(['/interests']);
            }
          }
        ]
      });
      await alert.present();
    }
  }
}
