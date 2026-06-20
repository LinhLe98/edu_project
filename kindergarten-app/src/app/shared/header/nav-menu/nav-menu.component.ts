import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgFor } from '@angular/common';

export const NAV_ITEMS = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Giới Thiệu', path: '/about' },
  { label: 'Hoạt Động', path: '/activities' },
  { label: 'Thư Viện', path: '/library' },
  { label: 'Tin Tức', path: '/news' },
  { label: 'Liên Hệ', path: '/contact' },
];

const ABOUT_SECTION_PREFIXES = ['/teachers', '/teacher-groups'];

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  private router = inject(Router);
  navItems = NAV_ITEMS;

  isExtraActive(item: (typeof NAV_ITEMS)[0]): boolean {
    if (item.path !== '/about') return false;
    return ABOUT_SECTION_PREFIXES.some(p => this.router.url.startsWith(p));
  }
}
