import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {
  category: string = 'all';  // Default kategori
  articles = [];

  constructor() {
    // localStorage'dan makaleleri alıyoruz
    const storedArticles = localStorage.getItem('articles');
    this.articles = storedArticles ? JSON.parse(storedArticles) : [];
  }

   get filteredArticles() {
    if (this.category === 'all') {
      return this.articles;
    }
    return this.articles.filter(article => article.category === this.category);
  }
}
