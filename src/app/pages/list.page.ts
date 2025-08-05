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
          content: 'Ionic, web teknolojilerini kullanarak hibrit mobil uygulamalar geliştirmek için kullanılan açık kaynaklı bir framework’tür.',
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
          content: 'Flutter, Google tarafından geliştirilen ve tek bir kod tabanıyla hem iOS hem de Android için uygulamalar oluşturmanızı sağlayan bir UI toolkit’idir.',
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
          content: 'Bir tarif, sadece lezzet değil; aynı zamanda bir kültürün taşıyıcısıdır. Her bölge, kendi hikâyesini tabaklara döker. Yemek, geçmiş ile günümüz arasında köprü kurar."',
          userName: 'Mustafa Şef',
          userPhoto: photoUrlMale,
          date: new Date(),
          image: 'data:image/jpeg;base64,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',
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
          image: 'data:image/png;base64,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',
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
          content: 'Her bilimsel ilerleme bir “neden?” sorusuyla başlar. Bilim, bilinmeyeni merak edenlerin cesur yolculuğudur. Merak oldukça keşifler sonsuz olur.',
          userName: 'Dr. Bilge Işık',
          userPhoto: photoUrlFemale,
          date: new Date(),
          image: 'https://cdn.oggito.com/images/full/2018/7/merak.jpg',
          version: Date.now(),
          likes: 1,
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

}