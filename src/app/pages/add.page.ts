import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule,TranslateModule],
})
export class AddPage {
  title:    string = '';
  subtitle: string = '';
  content:  string = '';
  category: string = '';
  image:    string = '';

  constructor(private router: Router,
    private translate: TranslateService) {}

  addArticle() {
   
   
   const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Kullanıcı giriş yapmamışsa bir şey yapma veya login sayfasına yönlendir
      this.router.navigate(['/login']);
      return;
    }

    const userDataString = localStorage.getItem(currentUser);
    if (!userDataString) {
      // Kullanıcı verisi bulunamadı, bu bir hata durumudur.
      console.error('Kullanıcı verisi bulunamadı!');
      return;
    }

    const userData = JSON.parse(userDataString);
    const gender = userData.gender;
     const photoUrl = gender === 'female'
      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZDb6idBchLO1WvHslQOiJ-r6bX6wQd3zAg&s'
      : 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png';
    
    const imageUrl = this.image || 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
    // Oturum açmış kullanıcıyı al
    
    const newArticle = {
      author: currentUser,
      gender: gender,
      userPhoto: photoUrl,
      id: Date.now(),
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      date: new Date().toISOString(),
      likes: 0,
      category: this.category,
      image: imageUrl,
      isDeletable: true
    };

    // yazılaeı localStoraga kaydeder
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

   
      this.router.navigate(['/list2']);
    
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
}