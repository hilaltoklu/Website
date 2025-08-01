import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
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
    let selectedCategory = '';
  if (this.category === 'flut') {
    selectedCategory = 'Flutter';
  } else if (this.category === 'ion') {
    selectedCategory = 'Ionic';
  } else if (this.category === 'tek') {
    selectedCategory = 'Teknoloji';
  } else if (this.category === 'art') {
    selectedCategory = 'Sanat';
  } else if (this.category === 'music') {
    selectedCategory = 'Müzik';
  } else if (this.category === 'science') {
    selectedCategory = 'Bilim';
  } else if (this.category === 'food') {
    selectedCategory = 'Yemek';
  } else {
    selectedCategory = 'Tümü';
  } 
    
    const photoUrl = this.gender === 'female'
      ? 'https://st3.depositphotos.com/1767687/17621/v/600/depositphotos_176214034-stock-illustration-default-avatar-profile-icon.jpg'
      : 'https://st3.depositphotos.com/1767687/17621/v/600/depositphotos_176214104-stock-illustration-default-avatar-profile-icon.jpg';

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
   if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/list2']);
    } 
    else {
      this.router.navigate(['/list']);
    }
  }
}
