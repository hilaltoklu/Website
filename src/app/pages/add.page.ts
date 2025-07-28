import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
  //styleUrls: ['add.page.scss'],
})
export class AddPage {
  title: string = '';
  subtitle: string = '';
  content: string = '';
  category: string = '';

  constructor(private router: Router) {}

  addArticle() {
    const newArticle = {
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      date: new Date().toISOString(),
      likes: 0,
      category: 'all', // Örnek kategori
      userPhoto: 'https://www.example.com/user.jpg', // Örnek kullanıcı fotoğrafı
      userName: 'Yeni Yazar', // Örnek kullanıcı ismi
      image: 'https://www.example.com/article.jpg', // Örnek makale görseli
    };

    // yazılaeı localStoraga kaydeder
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Sayfayı listeye yönlendiriyoruz
    this.router.navigate(['/list']);
  }
}
