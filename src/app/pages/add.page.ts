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
  image: string = '';

  constructor(private router: Router) {}

  addArticle() {
    const photoUrl = this.gender === 'female'
      ? 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png'
      : 'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-thumbnail.png';
    const imageUrl = this.image || 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
    // Oturum açmış kullanıcıyı al
    const currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    
    const newArticle = {
      author: currentUser || this.author, // Oturum açmış kullanıcıyı author olarak ekle
      gender: this.gender,
      id: Date.now(),
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      date: new Date().toISOString(),
      likes: 0,
      category: this.category,
      userPhoto: photoUrl,
      userName: currentUser || this.author, // Kullanıcı adını da ekle
      image: imageUrl,
      isDeletable: true
    };

    // yazılaeı localStoraga kaydeder
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

   
      this.router.navigate(['/list2']);
    
  }
}