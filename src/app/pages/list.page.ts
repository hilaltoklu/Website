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
          userPhoto: 'src/assets/male.jpg',
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
          category: 'flut',
          content: 'Flutter, Google tarafından geliştirilen ve tek bir kod tabanıyla hem iOS hem de Android için uygulamalar oluşturmanızı sağlayan bir UI toolkit’idir.',
          userName: 'Ayşe Kaya',
          userPhoto: 'src/assets/female.jpg',
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
          userPhoto: 'src/assets/female.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
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
          userPhoto: 'src/assets/male.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
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
          userPhoto: 'src/assets/icon/female.png',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
          version: Date.now(),
          likes: 1,
          isDeletable: true
        },
        {
          id: 6,
          title: 'Mobilde Tek Kodun Gücü',
          subtitle: 'Tek Kodla Her Platforma Ulaşın',
          category: 'flut',
          content: 'Flutter sayesinde geliştiriciler bir kez yazar, her yerde çalıştırır. Platform bağımsız yapısı sayesinde uygulama geliştirme süreci hız kazanır. Bu da hem zamandan hem maliyetten tasarruf sağlar.',
          userName: 'Berkay Bey',
          userPhoto: 'src/assets/male.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
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
          userPhoto: 'src/assets/female.jpg',
          date: new Date(),
          image: 'https://miro.medium.com/v2/resize:fit:1200/1*nlhD6_U277a1s_VxSbH11g.jpeg',
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