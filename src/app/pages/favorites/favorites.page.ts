import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonButtons,
  IonBackButton,
  IonIcon
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonAvatar,
    IonButtons,
    IonBackButton,
    IonIcon
  ],
})
export class FavoritesPage implements OnInit {
  favoritedArticles: any[] = [];
  currentUser: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserValue();
    this.loadFavoritedArticles();
  }

  ionViewWillEnter() {
    // Refresh articles when view is entered
    this.loadFavoritedArticles();
  }

  loadFavoritedArticles() {
    if (!this.currentUser) {
      this.favoritedArticles = [];
      return;
    }

    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    const likedArticleIds = userLikes[this.currentUser] || [];
    const allArticles = JSON.parse(localStorage.getItem('articles') || '[]');

    this.favoritedArticles = allArticles.filter((article: any) => likedArticleIds.includes(article.id));
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/article', id]);
  }
}