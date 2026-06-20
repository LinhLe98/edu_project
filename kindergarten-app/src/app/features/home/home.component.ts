import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SlideshowComponent } from '../../shared/slideshow/slideshow.component';
import { QuickStatsComponent } from './quick-stats/quick-stats.component';
import { SchoolOverviewComponent } from './school-overview/school-overview.component';
import { TeacherHighlightsComponent } from './teacher-highlights/teacher-highlights.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { RegistrationCtaComponent } from './registration-cta/registration-cta.component';
import { SlidesService } from '../../core/services/slides.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SlideshowComponent,
    QuickStatsComponent,
    SchoolOverviewComponent,
    TeacherHighlightsComponent,
    LatestNewsComponent,
    RegistrationCtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private slidesService = inject(SlidesService);
  slides = toSignal(this.slidesService.getHeroSlides(), { initialValue: [] });
}
