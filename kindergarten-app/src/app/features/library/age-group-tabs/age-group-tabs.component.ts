import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgClass } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { GalleryService } from '../../../core/services/gallery.service';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';
import { CardAlbumComponent } from '../../../shared/cards/card-album/card-album.component';
import { AgeGroup } from '../../../core/models';

type Tab = { label: string; age: AgeGroup };

@Component({
  selector: 'app-age-group-tabs',
  standalone: true,
  imports: [NgFor, NgClass, SectionHeadingComponent, CardAlbumComponent],
  templateUrl: './age-group-tabs.component.html',
  styleUrl: './age-group-tabs.component.css',
})
export class AgeGroupTabsComponent {
  private galleryService = inject(GalleryService);

  tabs: Tab[] = [
    { label: 'Lớp Mầm (3 tuổi)', age: '3-tuoi' },
    { label: 'Lớp Chồi (4 tuổi)', age: '4-tuoi' },
    { label: 'Lớp Lá (5 tuổi)', age: '5-tuoi' },
  ];

  activeTab = signal<AgeGroup>('3-tuoi');

  activeAlbums = toSignal(
    toObservable(this.activeTab).pipe(
      switchMap(age => this.galleryService.getByAgeGroup(age))
    ),
    { initialValue: [] }
  );
}
