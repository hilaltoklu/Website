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
  IonButtons,
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
import { Router, RouterModule } from '@angular/router';
import { add, heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-list2',
  templateUrl: 'list2.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
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
    RouterModule
  ]
})
export class List2Page {
  category: string = 'all';
  articles: any[] = [];
  segments: { value: string, label: string }[] = [];

  constructor(private router: Router) {
    addIcons({ add, heart });
  }

  ionViewWillEnter() {
    this.loadUserInterests();
    this.loadArticles();
  }

  loadUserInterests() {
    const defaultSegments = [
      { value: 'all', label: 'Tüm Yazılar' },
      { value: 'ionic', label: 'İonic' },
      { value: 'flutter', label: 'Flutter' },
      { value: 'teknoloji', label: 'Teknoloji' }
    ];

    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const interestsJson = localStorage.getItem(`interests_${currentUser}`);
      if (interestsJson) {
        const interests = JSON.parse(interestsJson);
        if (interests.length > 0) {
          const interestSegments = interests.map((interest: string) => ({
            value: interest,
            label: interest.charAt(0).toUpperCase() + interest.slice(1)
          }));
          this.segments = [{ value: 'all', label: 'Tüm Yazılar' }, ...interestSegments];
        } else {
          this.segments = defaultSegments;
        }
      } else {
        this.segments = defaultSegments;
      }
    } else {
      this.segments = defaultSegments;
    }
  }

  loadArticles() {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      this.articles = JSON.parse(storedArticles);
    } else {
      this.articles = [
        {
          id: 1,
          title: 'Ionic Framework',
          subtitle: 'Ionic Framework Nedir?',
          category: 'ionic',
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir framework’tür.',
          userName: 'Ahmet Ahmet',
          userPhoto: 'https://st3.depositphotos.com/1767687/17621/v/600/depositphotos_176214104-stock-illustration-default-avatar-profile-icon.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
          version: Date.now(),
          likes: 1,
          isDeletable: true
        },
        {
          id: 2,
          title: 'Mobil Uygulama Geliştirme',
          subtitle: 'Flutter Nedir?',
          category: 'flutter',
          content: 'Flutter, Google tarafından geliştirilen ve tek bir kod tabanıyla hem iOS hem de Android için uygulamalar oluşturmanızı sağlayan bir UI toolkit’idir.',
          userName: 'Ayşe Kaya',
          userPhoto: 'https://st3.depositphotos.com/1767687/17621/v/600/depositphotos_176214034-stock-illustration-default-avatar-profile-icon.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*j_Vw_EmuO4Exd_PxhJtebw.png',
          version: Date.now(),
          likes: 0,
          isDeletable: true
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
   logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/list']);
  }

}