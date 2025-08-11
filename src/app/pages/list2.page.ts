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
  PopoverController,
  ModalController
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { add, heart, ellipsisVertical, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UpdatePage } from 'src/app/pages/updates/update.page';

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
    RouterModule
  ]
})
export class List2Page {
  category: string = 'all';
  articles: any[] = [];
  segments: { value: string, label: string }[] = [];

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {
    addIcons({ add, heart, ellipsisVertical, createOutline, trashOutline });
  }

  ionViewWillEnter() {
    this.migrateArticleCategories();
    this.loadUserInterests();
    this.loadArticles();
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

  loadUserInterests() {
    const defaultSegments = [
      { value: 'all', label: 'Tüm Yazılar' },
      { value: 'ionic', label: 'İonic' },
      { value: 'flutter', label: 'Flutter' },
      { value: 'teknoloji', label: 'Teknoloji' },
      { value: 'sanat', label: 'Sanat' },
      { value: 'yemek', label: 'Yemek' },
      { value: 'bilim', label: 'Bilim' }, 
      { value: 'müzik', label: 'Müzik' },
      { value: 'yazilarim', label: 'Yazılarım' }

    ];

    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const interestsJson = sessionStorage.getItem(`interests_${currentUser}`);
      if (interestsJson) {
        const interests = JSON.parse(interestsJson);
        if (interests.length > 0) {
          const interestSegments = interests.map((interest: string) => ({
            value: interest,
            label: interest.charAt(0).toUpperCase() + interest.slice(1)
          }));
          this.segments = [
            { value: 'all', label: 'Tüm Yazılar' },
            { value: 'yazilarim', label: 'Yazılarım' },
            ...interestSegments
          ];
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
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/list']);
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