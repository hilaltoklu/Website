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
  IonLabel
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, person, settings, informationCircle, add, bookOutline } from 'ionicons/icons';

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

  constructor(private router: Router) {
    addIcons({ 
      home, 
      person, 
      settings, 
      informationCircle,
      add,
      bookOutline
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToList() {
    this.router.navigate(['/list']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}