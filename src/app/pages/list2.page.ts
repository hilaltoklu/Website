import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
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
  IonItem,  
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
  IonIcon,
  IonMenuButton,
  IonRouterOutlet,
  PopoverController,
  ModalController
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { add, heart, ellipsisVertical, createOutline, trashOutline, documentOutline, home, contrast, sunny } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UpdatePage } from 'src/app/pages/updates/update.page';
import { MenuComponent } from './menu.bilesen/menu.bilesen';
import { ThemeService } from './services/theme/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list2',
  templateUrl: 'list2.page.html',
  styleUrls: ['list2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonItem,
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
    IonMenuButton,
    IonRouterOutlet,
    RouterModule,
    MenuComponent,
    TranslateModule
  ]
})
export class List2Page {
  category: string = 'all';
  articles: any[] = [];
  segments: { value: string, label: string }[] = [];
  isLoggedIn$: Observable<string | null>;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private themeService: ThemeService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.isLoggedIn$ = this.authService.currentUserObservable$;
    addIcons({ 
      add, 
      heart, 
      ellipsisVertical, 
      createOutline, 
      trashOutline, 
      documentOutline,
      home,
      contrast,
      sunny
    });
  }

  ionViewWillEnter() {
    this.migrateArticleCategories();
    this.migrateUserInterests();
    this.loadUserInterests();
    this.loadArticles();
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

  migrateUserInterests() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const interestsJson = sessionStorage.getItem(`interests_${currentUser}`);
      if (interestsJson) {
        let interests = JSON.parse(interestsJson);
        const interestMap: { [key: string]: string } = {
          'sanat': 'CATEGORIES.ART',
          'teknoloji': 'CATEGORIES.TECHNOLOGY',
          'müzik': 'CATEGORIES.MUSIC',
          'flutter': 'CATEGORIES.FLUTTER',
          'yemek': 'CATEGORIES.FOOD',
          'ionic': 'CATEGORIES.IONIC',
          'bilim': 'CATEGORIES.SCIENCE'
        };

        const needsMigration = interests.some((interest: string) => interestMap[interest]);
        if (needsMigration) {
          const migratedInterests = interests.map((interest: string) => interestMap[interest] || interest);
          sessionStorage.setItem(`interests_${currentUser}`, JSON.stringify(migratedInterests));
        }
      }
    }
  }

  loadUserInterests() {
    const currentUser = sessionStorage.getItem('currentUser');
    const categoryKeys = ['ART', 'TECHNOLOGY', 'MUSIC', 'FLUTTER', 'FOOD', 'IONIC', 'SCIENCE'];
  
    const defaultSegments = categoryKeys.map(key => ({
      value: `CATEGORIES.${key}`,
      label: this.translate.instant(`CATEGORIES.${key}`)
    }));
  
    this.translate.get(['LIST2.ALL_ARTICLES2', 'LIST2.MY_ARTICLE']).subscribe(translations => {
      const allArticlesLabel = translations['LIST2.ALL_ARTICLES2'];
      const myArticlesLabel = translations['LIST2.MY_ARTICLE'];
  
      if (currentUser) {
        const interestsJson = sessionStorage.getItem(`interests_${currentUser}`);
        if (interestsJson) {
          const interests = JSON.parse(interestsJson);
          if (interests.length > 0) {
            const interestSegments = interests.map((interestKey: string) => ({
              value: interestKey,
              label: this.translate.instant(interestKey)
            }));
            this.segments = [
              { value: 'all', label: allArticlesLabel },
              { value: 'yazilarim', label: myArticlesLabel },
              ...interestSegments
            ];
          } else {
            this.segments = [
              { value: 'all', label: allArticlesLabel },
              { value: 'yazilarim', label: myArticlesLabel },
              ...defaultSegments
            ];
          }
        } else {
          this.segments = [
            { value: 'all', label: allArticlesLabel },
            { value: 'yazilarim', label: myArticlesLabel },
            ...defaultSegments
          ];
        }
      } else {
        this.segments = [
          { value: 'all', label: allArticlesLabel },
          ...defaultSegments
        ];
      }
    });
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
          category: 'ionic',
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir framework\'tür.',
          userName: 'Ahmet Ahmet',
          userPhoto: photoUrlMale,
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
          version: Date.now(),
          likes: 1,
          isDeletable: true
        },
        
      ];
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }
  }

  get filteredArticles() {
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (this.category === 'all') {
      return this.articles;
    } else if (this.category === 'yazilarim') {
      return this.articles.filter(article => 
        currentUser && article.author === currentUser
      );
    } else {
      return this.articles.filter(article => article.category === this.category);
    }
  }

  // Kullanıcının kendi makalesini kontrol et
  isUserArticle(article: any): boolean {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser === article.author;
  }

  // Menü açma fonksiyonu
  async openMenu(event: Event, article: any) {
    event.stopPropagation();
    
    // Basit  popover komponenti 
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      componentProps: {
        article: article
      },
      event: event,
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    
    if (data) {
      if (data.action === 'edit') {
        this.editArticle(article);
      } else if (data.action === 'delete') {
        this.deleteArticle(article);
      }
    }
  }

  // Makale düzenleme
  async editArticle(article: any) {
    const modal = await this.modalController.create({
      component: UpdatePage,
      componentProps: {
        article: { ...article }
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    if (data) {
      // Makaleyi güncelle
      const articleIndex = this.articles.findIndex(a => a.id === article.id);
      if (articleIndex !== -1) {
        this.articles[articleIndex] = { ...data };
        localStorage.setItem('articles', JSON.stringify(this.articles));
      }
    }
  }

  // Makale silme
  deleteArticle(article: any) {
    const articleIndex = this.articles.findIndex(a => a.id === article.id);
    if (articleIndex !== -1) {
      this.articles.splice(articleIndex, 1);
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }
  }

  // Makaleye git
  goToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/list']);
  }

  login() {
    this.router.navigate(['/login']);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
}

// Menü için Popover Componenti
@Component({
  template: `
    <ion-list class="custom-action-list">
    
  <ion-item button class="edit-item" (click)="selectAction('edit')">
    <ion-icon name="create-outline" slot="start"></ion-icon>
    <ion-label>Düzenle</ion-label>
  </ion-item>
  <ion-item button class="delete-item" (click)="selectAction('delete')">
    <ion-icon name="trash-outline" slot="start"></ion-icon>
    <ion-label>Sil</ion-label>
  </ion-item>
</ion-list>


  `,
  standalone: true,
  imports: [
    IonList,
    IonButton,
    IonIcon,
    IonLabel,
    CommonModule,
    IonItem
  ]
})
export class MenuPopoverComponent {
  constructor(private popoverController: PopoverController) {}

  selectAction(action: string) {
    this.popoverController.dismiss({
      action: action
    });
  }
}