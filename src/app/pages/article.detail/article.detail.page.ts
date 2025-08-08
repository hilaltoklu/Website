import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import IonicModule from '@ionic/angular/standalone';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonList, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonAvatar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-article-page',
  templateUrl: './article.detail.html',
  styleUrls: ['./article.detail.scss'],
  standalone: true,
  imports: [
    CommonModule,
    //IonicModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    IonAvatar,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
  ]
})
export class ArticleDetailPage implements OnInit {
  article: any;
  isLiked: boolean = false;
  currentUser: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser');
    const id = this.route.snapshot.paramMap.get('id');
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    if (id) {
      this.article = articles.find((article: any) => article.id === +id);
      if (this.currentUser) {
        this.checkIfLiked();
      }
    }
  }

  checkIfLiked() {
    if (!this.currentUser) return;
    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    const likedArticles = userLikes[this.currentUser] || [];
    this.isLiked = likedArticles.includes(this.article.id);
  }

  likeArticle() {
    if (!this.currentUser) {
      // Handle case where user is not logged in, maybe redirect to login
      this.router.navigate(['/login']);
      return;
    }

    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    let likedArticles = userLikes[this.currentUser] || [];

    if (this.isLiked) {
      // Unlike
      this.article.likes--;
      this.isLiked = false;
      likedArticles = likedArticles.filter((id: number) => id !== this.article.id);
    } else {
      // Like
      this.article.likes++;
      this.isLiked = true;
      likedArticles.push(this.article.id);
    }

    userLikes[this.currentUser] = likedArticles;
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const articleIndex = articles.findIndex((a: any) => a.id === this.article.id);
    if (articleIndex > -1) {
      articles[articleIndex] = this.article;
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }

  /* şimdilik silmeyi geçiyorum 
 deleteArticle() {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const updatedArticles = articles.filter((a: any) => a.id !== this.article.id);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    this.router.navigate(['/list']);
  }
  --*/
}
