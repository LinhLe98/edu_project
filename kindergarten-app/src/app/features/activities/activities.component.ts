import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ActivityAlbumLinksComponent } from './activity-album-links/activity-album-links.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [PageHeroComponent, ProgramListComponent, ActivityAlbumLinksComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
})
export class ActivitiesComponent {}
