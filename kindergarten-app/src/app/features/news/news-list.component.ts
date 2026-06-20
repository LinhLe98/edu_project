import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../core/services/news.service';
import { NewsCategory, NewsArticle } from '../../core/models';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { CardNewsComponent } from '../../shared/cards/card-news/card-news.component';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, FormsModule, RouterLink, PageHeroComponent, CardNewsComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent {
  private newsService = inject(NewsService);

  private allNews = toSignal(this.newsService.getAll(), { initialValue: [] });

  activeCategory = signal<NewsCategory | 'all'>('all');
  searchQuery = signal('');
  currentPage = signal(1);

  categories = [
    { key: 'all' as const, label: 'Tất Cả' },
    { key: 'su-kien' as const, label: 'Sự Kiện' },
    { key: 'thong-bao' as const, label: 'Thông Báo' },
    { key: 'hoat-dong' as const, label: 'Hoạt Động' },
    { key: 'tin-tuc' as const, label: 'Tin Tức' },
  ];

  private allFiltered = computed<NewsArticle[]>(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery().trim().toLowerCase();
    const articles = cat === 'all'
      ? this.allNews()
      : this.allNews().filter(a => a.category === cat);
    if (!q) return articles;
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    );
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.allFiltered().length / PAGE_SIZE)));

  pagedArticles = computed<NewsArticle[]>(() => {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.allFiltered().slice(start, start + PAGE_SIZE);
  });

  pageNumbers = computed<number[]>(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  setCategory(cat: NewsCategory | 'all') {
    this.activeCategory.set(cat);
    this.currentPage.set(1);
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
