import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article.detail.html',
  styleUrls: ['./article.detail.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleDetailPage implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    if (id) {
      this.article = articles.find((article: any) => article.id === +id);
    }
  }
}
