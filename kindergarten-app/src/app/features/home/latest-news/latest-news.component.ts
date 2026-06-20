import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardNewsComponent } from '../../../shared/cards/card-news/card-news.component';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [NgFor, RouterLink, SectionHeadingComponent, CardNewsComponent],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css',
})
export class LatestNewsComponent {
  private newsService = inject(NewsService);
  latestNews = toSignal(this.newsService.getLatest(3), { initialValue: [] });
}
