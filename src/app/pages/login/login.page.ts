import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { rocketOutline } from 'ionicons/icons';
import confetti from 'canvas-confetti';

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
    private toastController: ToastController,
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
              this.router.navigate(['/login']);
            }
          }
        ]
      });
     await toast.present();
      return;
    }

    const savedPassword = localStorage.getItem(this.username);

    if (savedPassword && this.password === savedPassword) {
      sessionStorage.setItem('currentUser', this.username);
      
      // Konfeti animasyonunu başlat
      this.showConfetti();
      
      // Custom toast göster
      const toast = await this.toastController.create({
        header: 'Başarılı',
        message: '🎉 Giriş Başarılı',
        duration: 0, // Manuel olarak kapatılacak
        position: 'middle',
        cssClass: 'success-toast',
        buttons: [
          {
            text: 'TAMAM',
            role: 'cancel',
            side: 'end',
            handler: () => {
              this.router.navigate(['/list2']);
            }
          }
        ]
      });
      
      await toast.present();
    } else {

      this.triggerShakeAnimation();

      
      const toast = await this.toastController.create({
        header: 'Giriş Başarısız',
        message: 'Kullanıcı adı veya şifre hatalı.',
        duration: 0, // Manuel olarak kapatılacak
        position: 'middle',
        cssClass: 'fail-toast',
        buttons: [
          {
            text: 'TAMAM',
            role: 'cancel',
            side: 'end',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      });



      await toast.present();
    }
  }

  // confetti animasyonu için
  private showConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
    });
    
    // Ek konfeti patlaması için
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
    }, 200);
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
  }




  /// shake efekti iöim
  private triggerShakeAnimation() {
    const loginContent = document.querySelector('ion-content');
    if (loginContent) {
      loginContent.classList.add('shake-animation');
      
      // Animasyon bitince class'ı kaldır
      setTimeout(() => {
        loginContent.classList.remove('shake-animation');
      }, 600);
    }
  }


  kayitOl() {
    this.router.navigate(['/kayitol']);
  }
}