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
  IonIcon,
  IonSpinner,
  IonChip
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.detail.html',
  styleUrls: ['./article.detail.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonSpinner,
    IonChip,
  ]
})
export class ArticleDetailPage implements OnInit {
  article: any = null; // Başlangıçta null olarak ayarla
  isLiked: boolean = false;
  currentUser: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Önce localStorage'dan currentUser'ı al, sonra sessionStorage'dan
    this.currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadArticle(+id);
    } else {
      console.error('Article ID not found');
      this.router.navigate(['/list2']);
    }
  }

  private loadArticle(articleId: number) {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    this.article = articles.find((article: any) => article.id === articleId);
    
    if (!this.article) {
      console.error('Article not found with ID:', articleId);
      this.router.navigate(['/list2']);
      return;
    }

    // userName property'sini article objesinde yoksa author'dan oluştur
    if (!this.article.userName && this.article.author) {
      this.article.userName = this.article.author;
    }

    console.log('Loaded article:', this.article); // Debug için

    if (this.currentUser) {
      this.checkIfLiked();
    }
  }

  checkIfLiked() {
    if (!this.currentUser || !this.article) return;
    
    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    const likedArticles = userLikes[this.currentUser] || [];
    this.isLiked = likedArticles.includes(this.article.id);
  }

  likeArticle() {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.article) {
      console.error('No article to like');
      return;
    }

    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    let likedArticles = userLikes[this.currentUser] || [];

    if (this.isLiked) {
      // Unlike
      this.article.likes = Math.max(0, this.article.likes - 1); // Negatif olmayacak şekilde
      this.isLiked = false;
      likedArticles = likedArticles.filter((id: number) => id !== this.article.id);
    } else {
      // Like
      this.article.likes = (this.article.likes || 0) + 1; // likes undefined ise 0 olarak başlat
      this.isLiked = true;
      likedArticles.push(this.article.id);
    }

    // User likes'ı güncelle
    userLikes[this.currentUser] = likedArticles;
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    // Articles array'ini güncelle
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const articleIndex = articles.findIndex((a: any) => a.id === this.article.id);
    if (articleIndex > -1) {
      articles[articleIndex] = { ...this.article };
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }
}