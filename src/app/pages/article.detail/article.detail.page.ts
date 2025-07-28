import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    if (id) {
      this.article = articles.find((article: any) => article.id === +id);
    }
  }
}
