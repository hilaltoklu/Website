import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { rocketOutline } from 'ionicons/icons';
import confetti from 'canvas-confetti';
import { AuthService } from '../services/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,TranslateModule],
})
export class LoginPage {

  username!: string;
  password!: string;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService,
    private translate : TranslateService
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
      this.translate.get([
        'ALERTS.LOGIN_FAILED_HEADER',
        'ALERTS.LOGIN_FAILED_BLANK_FIELDS',
        'ALERTS.OK_BUTTON'
      ]).subscribe(async (translations) => {
        const toast = await this.toastController.create({
          header: translations['ALERTS.LOGIN_FAILED_HEADER'],
          message: translations['ALERTS.LOGIN_FAILED_BLANK_FIELDS'],
          duration: 0,
          position: 'middle',
          cssClass: 'fail-toast',
          buttons: [{
            text: translations['ALERTS.OK_BUTTON'],
            role: 'cancel',
            side: 'end',
            handler: () => { this.router.navigate(['/login']); }
          }]
        });
        await toast.present();
      });
      return;
    }

    const userDataString = localStorage.getItem(this.username);

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (this.password === userData.password) {
        this.authService.login(this.username);
        this.showConfetti();

        this.translate.get([
          'ALERTS.SUCCESS_HEADER',
          'ALERTS.LOGIN_SUCCESS_MESSAGE',
          'ALERTS.OK_BUTTON'
        ]).subscribe(async (translations) => {
          const toast = await this.toastController.create({
            header: translations['ALERTS.SUCCESS_HEADER'],
            message: translations['ALERTS.LOGIN_SUCCESS_MESSAGE'],
            duration: 0,
            position: 'middle',
            cssClass: 'success-toast',
            buttons: [{
              text: translations['ALERTS.OK_BUTTON'],
              role: 'cancel',
              side: 'end',
              handler: () => { this.router.navigate(['/list2']); }
            }]
          });
          await toast.present();
        });
      } else {
        this.triggerShakeAnimation();
        this.translate.get([
          'ALERTS.LOGIN_FAILED_HEADER',
          'ALERTS.LOGIN_FAILED_INVALID_CREDENTIALS',
          'ALERTS.OK_BUTTON'
        ]).subscribe(async (translations) => {
          const toast = await this.toastController.create({
            header: translations['ALERTS.LOGIN_FAILED_HEADER'],
            message: translations['ALERTS.LOGIN_FAILED_INVALID_CREDENTIALS'],
            duration: 0,
            position: 'middle',
            cssClass: 'fail-toast',
            buttons: [{
              text: translations['ALERTS.OK_BUTTON'],
              role: 'cancel',
              handler: () => { this.router.navigate(['/login']); }
            }]
          });
          await toast.present();
        });
      }
    } else {
      this.triggerShakeAnimation();
      this.translate.get([
        'ALERTS.LOGIN_FAILED_HEADER',
        'ALERTS.LOGIN_FAILED_INVALID_CREDENTIALS',
        'ALERTS.OK_BUTTON'
      ]).subscribe(async (translations) => {
        const toast = await this.toastController.create({
          header: translations['ALERTS.LOGIN_FAILED_HEADER'],
          message: translations['ALERTS.LOGIN_FAILED_INVALID_CREDENTIALS'],
          duration: 0,
          position: 'middle',
          cssClass: 'fail-toast',
          buttons: [{
            text: translations['ALERTS.OK_BUTTON'],
            role: 'cancel',
            side: 'end',
            handler: () => { this.router.navigate(['/login']); }
          }]
        });
        await toast.present();
      });
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
      
      
    }
  }


  kayitOl() {
    this.router.navigate(['/kayitol']);
  }


   switchLanguage(language: string) {
    this.translate.use(language);
  }
}