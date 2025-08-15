import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/angular/standalone';

interface Interest {
  key: string;
  emoji: string;
  selected: boolean;
}

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton, IonText,TranslateModule]
})
export class InterestsPage {

  
  interests: Interest[] = [
     { key: 'CATEGORIES.ART', emoji: '🎨', selected: false },
    { key: 'CATEGORIES.TECHNOLOGY', emoji: '💻', selected: false },
    { key: 'CATEGORIES.MUSIC', emoji: '🎵', selected: false },
    { key: 'CATEGORIES.FLUTTER', emoji: '📱', selected: false },
    { key: 'CATEGORIES.FOOD', emoji: '🍔', selected: false },
    { key: 'CATEGORIES.IONIC', emoji: '🌐', selected: false },
    { key: 'CATEGORIES.SCIENCE', emoji: '🔬', selected: false },
  ];

  constructor(private router: Router, private alertController: AlertController,private translate: TranslateService) { }
  toggleInterest(interest: Interest) {
    if (!interest.selected && this.selectedInterestsCount() === 3) {
      this.presentAlert();
      return;
    }
    interest.selected = !interest.selected;
  }

  selectedInterestsCount(): number {
    return this.interests.filter(i => i.selected).length;
  }

  async presentAlert() {
    this.translate.get([
      'ALERTS.INTERESTS_LIMIT_HEADER',
      'ALERTS.INTERESTS_LIMIT_MESSAGE',
      'ALERTS.OK_BUTTON'
    ]).subscribe(async (translations) => {
      const alert = await this.alertController.create({
        header: translations['ALERTS.INTERESTS_LIMIT_HEADER'],
        message: translations['ALERTS.INTERESTS_LIMIT_MESSAGE'],
        buttons: [translations['ALERTS.OK_BUTTON']]
      });
      await alert.present();
    });
  }

  saveInterests() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.error('İlgi alanlarını kaydetmek için giriş gerekli. Lütfen giriş yapın.');
      this.router.navigate(['/login']);
      return;
    }
    const selectedInterests = this.interests.filter(i => i.selected).map(i => i.key.toLowerCase());
    sessionStorage.setItem(`interests_${currentUser}`, JSON.stringify(selectedInterests));
    this.router.navigate(['/list2']);
  }  
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
}
