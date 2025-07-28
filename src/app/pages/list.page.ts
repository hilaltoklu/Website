import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';
import { add, heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  ]
})
export class ListPage {
  category: string = 'all';
  articles: any[] = [];

  constructor(private router: Router) {
    addIcons({ add, heart });
    this.loadArticles();
  }

  ionViewWillEnter() {
    this.loadArticles();
  }

  loadArticles() {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      this.articles = JSON.parse(storedArticles);
    } else {
      this.articles = [
        {
          title: 'Ionic Framework Nedir?',
          subtitle: 'Mobil Uygulama Geliştirme',
          category: 'ion',
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir framework’tür.',
          userName: 'Ahmet Yılmaz',
          userPhoto: 'https://ionicframework.com/docs/img/demos/avatar.svg',
          date: new Date(),
          image: 'https://ionicframework.com/docs/img/demos/card-media.png',
          likes: 15
        },
        {
          title: 'Flutter ile Hızlı Başlangıç',
          subtitle: 'Dart Programlama Dili',
          category: 'flut',
          content: 'Flutter, Google tarafından geliştirilen ve tek bir kod tabanıyla hem iOS hem de Android için uygulamalar oluşturmanızı sağlayan bir UI toolkit’idir.',
          userName: 'Ayşe Kaya',
          userPhoto: 'https://ionicframework.com/docs/img/demos/avatar.svg',
          date: new Date(),
          image: 'https://ionicframework.com/docs/img/demos/card-media.png',
          likes: 25
        }
      ];
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }
  }

  get filteredArticles() {
    if (this.category === 'all') {
      return this.articles;
    }
    return this.articles.filter(article => article.category === this.category);
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  openArticle(article: any) {
    this.router.navigate(['/article-detail'], {
      queryParams: {
        article: JSON.stringify(article)
      }
    });
  }
}