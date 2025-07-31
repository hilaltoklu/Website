import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/angular/standalone';

interface Interest {
  name: string;
  emoji: string;
  selected: boolean;
}

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton, IonText]
})
export class InterestsPage {

  interests: Interest[] = [
    { name: 'Sanat', emoji: '🎨', selected: false },
    { name: 'Teknoloji', emoji: '💻', selected: false },
    { name: 'Müzik', emoji: '🎵', selected: false },
    { name: 'Flutter', emoji: '📱', selected: false },
    { name: 'Yemek', emoji: '🍔', selected: false },
    { name: 'Ionic', emoji: '🌐', selected: false },
    { name: 'Bilim', emoji: '🔬', selected: false },
  ];

  constructor(private router: Router, private alertController: AlertController) { }

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
    const alert = await this.alertController.create({
      header: 'Limit Reached',
      message: 'You can select a maximum of 3 interests.',
      buttons: ['OK']
    });
    await alert.present();
  }

  saveInterests() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.error('No current user found to save interests for.');
      this.router.navigate(['/login']);
      return;
    }
    const selectedInterests = this.interests.filter(i => i.selected).map(i => i.name.toLowerCase());
    localStorage.setItem(`interests_${currentUser}`, JSON.stringify(selectedInterests));
    this.router.navigate(['/list2']);
  }  
}
