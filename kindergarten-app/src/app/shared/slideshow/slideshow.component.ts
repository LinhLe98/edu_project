import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSlide } from '../../core/models';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent implements AfterViewInit, OnChanges {
  @Input() slides: HeroSlide[] = [];
  @Input() height = '80vh';

  @ViewChild('swiperEl') swiperRef!: ElementRef;

  ngAfterViewInit() {
    this.initSwiper();
  }

  ngOnChanges() {
    if (this.swiperRef?.nativeElement) {
      this.initSwiper();
    }
  }

  private initSwiper() {
    const el = this.swiperRef?.nativeElement;
    if (!el) return;
    Object.assign(el, {
      slidesPerView: 1,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { clickable: true },
      navigation: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      a11y: { enabled: false },
    });
    el.initialize();
  }
}
