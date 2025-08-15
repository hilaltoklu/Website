import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/pages/services/auth/auth.service';
import { Observable } from 'rxjs';
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
  IonItem,
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonAvatar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonMenuButton,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { add, heart, documentOutline, addCircleOutline, personCircleOutline, languageOutline, moonOutline, informationCircleOutline, logOutOutline, home, contrast, sunny } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { MenuComponent } from './menu.bilesen/menu.bilesen';
import { ThemeService } from './services/theme/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
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
    IonItem,
    IonContent,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    IonMenuButton,
    IonRouterOutlet,
    RouterModule,
    MenuComponent,
    IonRouterOutlet,
    TranslateModule
  ]
})
export class ListPage {
  category: string = 'all';
  articles: any[] = [];
  isLoggedIn$: Observable<string | null>;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.isLoggedIn$ = this.authService.currentUserObservable$;
    addIcons({ 
      add, 
      heart, 
      documentOutline, 
      addCircleOutline, 
      personCircleOutline, 
      languageOutline, 
      moonOutline, 
      informationCircleOutline, 
      logOutOutline,
      home,
      contrast,
      sunny
    });
    this.loadArticles();
  }

  ionViewWillEnter() {
    this.loadArticles();
    this.migrateArticleCategories();
  }

  // Test tema butonu
  testTheme() {
    console.log('Theme test button clicked');
    this.themeService.debugCurrentTheme();
    this.themeService.toggleTheme();
  }

  // localde tutulan makalelerin kategorilerini güncelle
  migrateArticleCategories() {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      let articles = JSON.parse(storedArticles);
      const categoryMap: { [key: string]: string } = {
        'ion': 'ionic',
        'flutter': 'flutter',
        'tek': 'teknoloji',
        'art': 'sanat',
        'music': 'müzik',
        'food': 'yemek',
        'science': 'bilim'
      };

      let needsUpdate = false;
      articles.forEach((article: any) => {
        if (categoryMap[article.category]) {
          article.category = categoryMap[article.category];
          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        localStorage.setItem('articles', JSON.stringify(articles));
      }
    }
  }

  loadArticles() {
    const storedArticles = localStorage.getItem('articles');
    const photoUrlFemale = 'https://w7.pngwing.com/pngs/417/181/png-transparent-computer-icons-icon-design-woman-woman-hat-people-monochrome-thumbnail.png';
    const photoUrlMale = 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png';
    if (storedArticles) {
      this.articles = JSON.parse(storedArticles);
    } else {
      this.articles = [
        {
          id: 1,
          title: 'Ionic Framework',
          subtitle: 'Ionic Framework Nedir?',
          category: 'ion',
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir frameworktür.',
          userName: 'Ahmet Ahmet',
          userPhoto: photoUrlMale,
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 2,
          title: 'Mobil Uygulama Geliştirme',
          subtitle: 'Flutter Nedir?',
          category: 'flutter',
          content: 'Flutter, Google tarafından geliştirilen ve tek bir kod tabanıyla hem iOS hem de Android için uygulamalar oluşturmanızı sağlayan bir UI toolkitidir.',
          userName: 'Ayşe Kaya',
          userPhoto: photoUrlFemale,
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*j_Vw_EmuO4Exd_PxhJtebw.png',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 3,
          title: 'Renklerin Dili',
          subtitle: 'Duyguların renklerle eşleşmeleri',
          category: 'art',
          content: 'Renkler, insanların duygularını ifade etmenin güçlü bir yoludur. Bu makalede, farklı renklerin hangi duyguları çağrıştırdığına dair bir inceleme yapacağız.',
          userName: 'Elif Renktaş',
          userPhoto: photoUrlFemale,
          date: new Date(),
          image: 'https://www.designpoolpatterns.com/wp-content/uploads/2023/09/Color_Wheel-01-1-scaled.jpg',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 4,
          title: 'Lezzetin Peşinde',
          subtitle: 'Lezzetli Tariflerin Kültür Yolculuğu',
          category: 'food',
          content: 'Bir tarif, sadece lezzet değil; aynı zamanda bir kültürün taşıyıcısıdır. Her bölge, kendi hikâyesini tabaklara döker. Yemek, geçmiş ile günümüz arasında köprü kurar.',
          userName: 'Mustafa Şef',
          userPhoto: photoUrlMale,
          date: new Date(),
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 5,
          title: 'Ruhun Ritmi',
          subtitle: 'Ruhun Melodik Tercümanı',
          category: 'music',
          content: 'Müzik, ruhun derinliklerine inen bir yolculuktur. Her nota, bir duyguyu ifade eder; her melodi, bir hikaye anlatır.',
          userName: 'Canan Nota',
          userPhoto: photoUrlFemale,
          date: new Date(),
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 6,
          title: 'Mobilde Tek Kodun Gücü',
          subtitle: 'Tek Kodla Her Platforma Ulaşın',
          category: 'flutter',
          content: 'Flutter sayesinde geliştiriciler bir kez yazar, her yerde çalıştırır. Platform bağımsız yapısı sayesinde uygulama geliştirme süreci hız kazanır. Bu da hem zamandan hem maliyetten tasarruf sağlar.',
          userName: 'Berkay Bey',
          userPhoto: photoUrlMale,
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*j_Vw_EmuO4Exd_PxhJtebw.png',
          version: Date.now(),
          likes: 0,
          isDeletable: true
        },
        {
          id: 7,
          title: 'Merakla Başlayan Yolculuk',
          subtitle: 'Merak, öğrenmenin ilk adımıdır.',
          category: 'science',
          content: 'Her bilimsel ilerleme bir "neden?" sorusuyla başlar. Bilim, bilinmeyeni merak edenlerin cesur yolculuğudur. Merak oldukça keşifler sonsuz olur.',
          userName: 'Dr. Bilge Işık',
          userPhoto: photoUrlFemale,
          date: new Date(),
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
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

    
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
}