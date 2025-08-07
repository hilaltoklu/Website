import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddPage {
  author: string = '';
  gender: string = '';
  title: string = '';
  subtitle: string = '';
  content: string = '';
  category: string = '';

  constructor(private router: Router) {}

  addArticle() {
    const photoUrl = this.gender === 'female'
      ? 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png'
      : 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png';

    const newArticle = {
      author: this.author,
      gender: this.gender,
      id: Date.now(),
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      date: new Date().toISOString(),
      likes: 0,
      category: this.category,
      userPhoto: photoUrl,
      userName: this.author,
      image: 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg',
      isDeletable: true
    };

    // yazılaeı localStoraga kaydeder
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Sayfayı listeye yönlendiriyoruz
   if (sessionStorage.getItem('currentUser')) {

      this.router.navigate(['/list2']);
    } 
    else {
      this.router.navigate(['/list']);
    }
  }
}
