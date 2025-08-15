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

  // Kategori eşleştirmeleri - düzeltildi
  private categoryMappings = [
    { key: 'ART', value: 'sanat', dbValue: 'sanat' },
    { key: 'TECHNOLOGY', value: 'teknoloji', dbValue: 'teknoloji' },
    { key: 'MUSIC', value: 'müzik', dbValue: 'müzik' },
    { key: 'FLUTTER', value: 'flutter', dbValue: 'flutter' },
    { key: 'FOOD', value: 'yemek', dbValue: 'yemek' },
    { key: 'IONIC', value: 'ionic', dbValue: 'ionic' },
    { key: 'SCIENCE', value: 'bilim', dbValue: 'bilim' }
  ];

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
      console.log('Migration - Raw interests:', interestsJson);
      
      if (interestsJson) {
        let interests = JSON.parse(interestsJson);
        console.log('Migration - Parsed interests:', interests);
        
        const interestMap: { [key: string]: string } = {
          'sanat': 'ART',
          'art': 'ART',
          'teknoloji': 'TECHNOLOGY',
          'technology': 'TECHNOLOGY',
          'müzik': 'MUSIC',
          'music': 'MUSIC',
          'flutter': 'FLUTTER',
          'yemek': 'FOOD',
          'food': 'FOOD',
          'ionic': 'IONIC',
          'bilim': 'SCIENCE',
          'science': 'SCIENCE'
        };

        // Eski format kontrolü ve dönüşümü
        const needsMigration = interests.some((interest: string) => 
          interest.startsWith('CATEGORIES.') || interestMap[interest.toLowerCase()]
        );
        
        console.log('Migration needed:', needsMigration);
        
        if (needsMigration) {
          const migratedInterests = interests.map((interest: string) => {
            // CATEGORIES. prefix'ini kaldır
            let cleanKey = interest.replace('CATEGORIES.', '');
            console.log('Migrating:', interest, '->', cleanKey);
            
            // Eğer lowercase mapping varsa kullan, yoksa uppercase yap
            const mapped = interestMap[cleanKey.toLowerCase()];
            const result = mapped || cleanKey.toUpperCase();
            console.log('Final result:', result);
            return result;
          });
          
          console.log('Migrated interests:', migratedInterests);
          sessionStorage.setItem(`interests_${currentUser}`, JSON.stringify(migratedInterests));
        }
      }
    }
  }

  loadUserInterests() {
    const currentUser = sessionStorage.getItem('currentUser');
    console.log('Current user:', currentUser); //debug için
    
    this.translate.get(['LIST2.ALL_ARTICLES2', 'LIST2.MY_ARTICLE']).subscribe(translations => {
      const allArticlesLabel = translations['LIST2.ALL_ARTICLES2'];
      const myArticlesLabel = translations['LIST2.MY_ARTICLE'];

      if (currentUser) {
        const interestsJson = sessionStorage.getItem(`interests_${currentUser}`);
        console.log('Interests JSON:', interestsJson);
        
        if (interestsJson) {
          const interests = JSON.parse(interestsJson);
          console.log('Parsed interests:', interests);
          
          if (interests && interests.length > 0) {
            // Kullanıcının seçtiği ilgi alanlarını segmentlere ekle
            const interestSegments = interests
              .map((interestKey: string) => {
                console.log('Processing interest:', interestKey);
                const category = this.categoryMappings.find(cat => cat.key === interestKey);
                console.log('Found category:', category);
                
                return category ? {
                  value: category.dbValue,
                  label: this.translate.instant(`CATEGORIES.${category.key}`)
                } : null;
              })
              .filter((segment: any) => segment !== null);

            console.log('Interest segments:', interestSegments);

            this.segments = [
              { value: 'all', label: allArticlesLabel },
              { value: 'yazilarim', label: myArticlesLabel },
              ...interestSegments
            ];
          } else {
            // Boş ilgi alanları listesi
            this.segments = [
              { value: 'all', label: allArticlesLabel },
              //{ value: 'yazilarim', label: myArticlesLabel }
            ];
          }
        } else {
          // İlgi alanı seçmemiş kullanıcılar için sadece temel segmentler
          this.segments = [
            //{ value: 'all', label: allArticlesLabel },
            { value: 'yazilarim', label: myArticlesLabel }
          ];
        }
      } else {
        // Giriş yapmamış kullanıcılar için sadece "Tüm Yazılar"
        this.segments = [
          { value: 'all', label: allArticlesLabel }
        ];
      }

      console.log('Final segments:', this.segments);

      // Tekrar eden segmentleri filtrele
      this.segments = this.segments.filter((segment, index, self) =>
        index === self.findIndex((s) => (
          s.value === segment.value && s.label === segment.label
        ))
      );
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
          isDeletable: true,
          author: 'defaultUser' // Örnek için
        }
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

  // modal açma fonksiyonu
  async openMenu(event: Event, article: any) {
    event.stopPropagation();
    
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

  // Makaleye detayın git
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
    this.translate.use(language).subscribe(() => {
      this.loadUserInterests(); // Dil değiştiğinde segmentleri yenile
    });
  }
}

// Menü için Popover Componenti
@Component({
  template: `
    <ion-list class="custom-action-list">
      <ion-item button class="edit-item" (click)="selectAction('edit')">
        <ion-icon name="create-outline" slot="start"></ion-icon>
        <ion-label>{{ 'UPDATE.EDIT' | translate }}</ion-label>
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
    IonItem,
    TranslateModule
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