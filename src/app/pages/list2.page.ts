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
      const interestsJson = localStorage.getItem(`interests_${currentUser}`);
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
          category: 'ion',
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir frameworktür.',
          userName: 'Ahmet Ahmet',
          userPhoto: photoUrlMale,
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
          likes: 1,
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
          likes: 1,
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
          likes: 1,
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
          likes: 1,
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
          likes: 1,
          isDeletable: true
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
    <ion-list>
      <ion-item button (click)="selectAction('edit')">
        <ion-icon name="create-outline" slot="start"></ion-icon>
        <ion-label>Düzenle</ion-label>
      </ion-item>
      <ion-item button (click)="selectAction('delete')" color="danger">
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