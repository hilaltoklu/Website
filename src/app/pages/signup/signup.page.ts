import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

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
    private toastController: ToastController,

    private router: Router
  ) { }

  async kayitOl() {


    if (!this.username || !this.password) {
      this.triggerShakeAnimation();
      const toast = await this.toastController.create({
        header: 'Giriş Başarısız',
        message: 'Kullanıcı adı ve şifre alanları boş bırakılamaz.',
        duration: 0, // Manuel olarak kapatılacak
        position: 'middle',
        cssClass: 'fail-toast',
        buttons: [
          {
            text: 'TAMAM',
            role: 'cancel',
            side: 'end',
             handler: () => {
              this.router.navigate(['/kayitol']);
            }
          }
        ]
      });
      await toast.present();
      return;
    }

    const existingUser = localStorage.getItem(this.username);
    if (existingUser) {

      this.triggerShakeAnimation();
      const toast = await this.toastController.create({
        header: 'Giriş Başarısız',
        message: 'Bu kullanıcı adı zaten kayıtlı.',
        duration: 0, // Manuel olarak kapatılacak
        position: 'middle',
        cssClass: 'fail-toast',
        buttons: [
          {
            text: 'TAMAM',
            role: 'cancel',
            side: 'end',
            handler: () => {
              this.router.navigate(['/kayitol']);
            }
          }
        ]
      });
      await toast.present();
    } else {
      localStorage.setItem(this.username, this.password);
      localStorage.setItem('currentUser', this.username);
            this.showConfetti();

      const toast = await this.toastController.create({
        header: 'Başarılı',
        message: '🎉 Kayıt Başarılı',
        duration: 0, // Manuel olarak kapatılacak
        position: 'middle',
        cssClass: 'success-toast',
        buttons: [
          {
            text: 'TAMAM',
            role: 'cancel',
            side: 'end',
            handler: () => {
              this.router.navigate(['/interests']);
            }
          }
        ]
      });
      await toast.present();
    }
  }

  private showConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
      });
}

private triggerShakeAnimation() {
  const loginContent = document.querySelector('ion-content');
  if (loginContent) {
    // CSS'e bağımlı değil, direkt JavaScript ile animasyon
    loginContent.animate([
      { transform: 'translateX(0)' },    // Başlangıç
      { transform: 'translateX(-5px)' }, // Sola
      { transform: 'translateX(5px)' },  // Sağa
      { transform: 'translateX(-5px)' }, // Sola
      { transform: 'translateX(5px)' },  // Sağa
      { transform: 'translateX(0)' }     // Bitiriş
    ], {
      duration: 600,                     // 0.6 saniye
      easing: 'ease-in-out'             // Yumuşak geçiş
    });
  }
}


}
