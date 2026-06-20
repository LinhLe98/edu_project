import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'activities',
    loadComponent: () => import('./features/activities/activities.component').then(m => m.ActivitiesComponent),
  },
  {
    path: 'library',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/library/library.component').then(m => m.LibraryComponent),
      },
      {
        path: 'album/:id',
        loadComponent: () => import('./features/library/album-detail/album-detail.component').then(m => m.AlbumDetailComponent),
      },
    ],
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/news/news-list.component').then(m => m.NewsListComponent),
      },
      {
        path: ':slug',
        loadComponent: () => import('./features/news/news-detail.component').then(m => m.NewsDetailComponent),
      },
    ],
  },
  {
    path: 'teachers/:id',
    loadComponent: () => import('./features/teacher/teacher-detail.component').then(m => m.TeacherDetailComponent),
  },
  {
    path: 'teacher-groups/:dept',
    loadComponent: () => import('./features/teacher-group/teacher-group-detail.component').then(m => m.TeacherGroupDetailComponent),
  },
  {
    path: 'activities/:slug',
    loadComponent: () => import('./features/activities/activity-detail/activity-detail.component').then(m => m.ActivityDetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
