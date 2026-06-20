import { Component, Input } from '@angular/core';
import { NewsArticle } from '../../../core/models';

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [],
  templateUrl: './card-news.component.html',
  styleUrl: './card-news.component.css',
})
export class CardNewsComponent {
  @Input() article!: NewsArticle;

  get formattedDate(): string {
    return new Date(this.article.publishedAt).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  get categoryLabel(): string {
    const map: Record<string, string> = {
      'su-kien':  'Sự Kiện',
      'thong-bao': 'Thông Báo',
      'tin-tuc':  'Tin Tức',
      'hoat-dong': 'Hoạt Động',
    };
    return map[this.article.category] ?? this.article.category;
  }
}
