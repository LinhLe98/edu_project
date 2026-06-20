import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, catchError, of } from 'rxjs';
import { NewsService } from '../../core/services/news.service';
import { NewsArticle, NewsComment } from '../../core/models';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { CardNewsComponent } from '../../shared/cards/card-news/card-news.component';

export interface NewsReaction {
  type: string;       // matches API slug: 'heart', 'thumbs-up', 'smile', 'party'
  emoji: string;
  label: string;
  count: number;
  reacted: boolean;
}

const REACTION_META: Omit<NewsReaction, 'count' | 'reacted'>[] = [
  { type: 'heart',     emoji: '❤️', label: 'Yêu thích' },
  { type: 'thumbs-up', emoji: '👍', label: 'Hữu ích' },
  { type: 'smile',     emoji: '😊', label: 'Thú vị' },
  { type: 'party',     emoji: '🎉', label: 'Tuyệt vời' },
];

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, PageHeroComponent, CardNewsComponent],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private sanitizer = inject(DomSanitizer);
  private destroyRef = inject(DestroyRef);

  article = signal<NewsArticle | null>(null);
  relatedArticles = signal<NewsArticle[]>([]);
  reactions = signal<NewsReaction[]>(REACTION_META.map(m => ({ ...m, count: 0, reacted: false })));
  comments = signal<NewsComment[]>([]);

  commentName = '';
  commentText = '';
  commentSuccess = false;
  commentError = false;

  react(index: number) {
    const r = this.reactions()[index];
    const art = this.article();
    if (!art) return;

    this.newsService.toggleReaction(art.slug, r.type, r.reacted)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (summary) => {
          this.reactions.update(rs =>
            rs.map(reaction => ({
              ...reaction,
              count: summary.reactions[reaction.type] ?? 0,
              reacted: reaction.type === r.type ? !r.reacted : reaction.reacted,
            }))
          );
        },
      });
  }

  submitComment() {
    if (!this.commentName.trim() || !this.commentText.trim()) return;
    const art = this.article();
    if (!art) return;

    this.newsService.postComment(art.slug, {
      authorName: this.commentName.trim(),
      message: this.commentText.trim(),
    }).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.commentName = '';
          this.commentText = '';
          this.commentSuccess = true;
          this.commentError = false;
          setTimeout(() => (this.commentSuccess = false), 3000);
        },
        error: () => {
          this.commentError = true;
          setTimeout(() => (this.commentError = false), 3000);
        },
      });
  }

  formatCommentDate(iso: string): string {
    return new Date(iso).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  get safeContent(): SafeHtml {
    const a = this.article();
    return a ? this.sanitizer.bypassSecurityTrustHtml(a.content) : '';
  }

  get formattedDate(): string {
    const a = this.article();
    if (!a) return '';
    return new Date(a.publishedAt).toLocaleDateString('vi-VN', {
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
    const a = this.article();
    return a ? (map[a.category] ?? a.category) : '';
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(params => {
        const slug = params.get('slug') ?? '';
        return this.newsService.getBySlug(slug).pipe(
          catchError(() => {
            this.router.navigate(['/news']);
            return of(null);
          })
        );
      })
    ).subscribe(found => {
      if (!found) return;
      this.article.set(found);

      // Load reactions from API
      this.newsService.getReactions(found.slug)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(summary => {
          this.reactions.set(REACTION_META.map(m => ({
            ...m,
            count: summary.reactions[m.type] ?? 0,
            reacted: false,
          })));
        });

      // Load approved comments from API
      this.newsService.getComments(found.slug)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(comments => this.comments.set(comments));

      // Load related articles
      this.newsService.getAll().subscribe(all => {
        this.relatedArticles.set(
          all.filter(n => n.id !== found.id && n.category === found.category).slice(0, 3)
        );
      });
    });
  }
}
