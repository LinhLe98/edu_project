import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { AgeGroupTabsComponent } from './age-group-tabs/age-group-tabs.component';
import { LearningMaterialsComponent } from './learning-materials/learning-materials.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [PageHeroComponent, AgeGroupTabsComponent, LearningMaterialsComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {}
