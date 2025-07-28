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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    if (id) {
      this.article = articles.find((article: any) => article.id === +id);
    }
  }
 deleteArticle() {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const updatedArticles = articles.filter((a: any) => a.id !== this.article.id);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    this.router.navigate(['/list']);
  }

}
