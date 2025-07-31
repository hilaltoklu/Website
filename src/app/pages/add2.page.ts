import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add2',
  templateUrl: 'add.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class Add2Page {
  author: string = '';
  gender: string = '';
  title: string = '';
  subtitle: string = '';
  content: string = '';
  category: string = '';

  constructor(private router: Router) {}

  addArticle() {
    let selectedCategory = '';
  if (this.category === 'flut') {
    selectedCategory = 'Flutter';
  } else if (this.category === 'ion') {
    selectedCategory = 'Ionic';
  } else if (this.category === 'tek') {
    selectedCategory = 'Teknoloji';
  } else {
    selectedCategory = 'Tümü';
  } 
    
    const photoUrl = this.gender === 'female'
      ? 'src/assets/female.jpg'
      : 'src/assets/male.jpg';

    const newArticle = {
      author: this.author,
      gender: this.gender,
      id: Date.now(),
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      date: new Date().toISOString(),
      likes: 0,
      category: selectedCategory,
      userPhoto: photoUrl,
      userName: this.author,
      image: 'https://www.example.com/article.jpg', // Örnek makale görseli
      isDeletable: true
    };

    // yazılaeı localStoraga kaydeder
    let articles = JSON.parse(localStorage.getItem('articles') || '[]');
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Sayfayı listeye yönlendiriyoruz
    this.router.navigate(['/list2']);
  }
}
