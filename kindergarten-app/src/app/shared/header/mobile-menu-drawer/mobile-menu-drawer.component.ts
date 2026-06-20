import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { NAV_ITEMS } from '../nav-menu/nav-menu.component';

const ABOUT_SECTION_PREFIXES = ['/teachers', '/teacher-groups'];

@Component({
  selector: 'app-mobile-menu-drawer',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  animations: [
    trigger('drawerAnim', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './mobile-menu-drawer.component.html',
  styleUrl: './mobile-menu-drawer.component.css',
})
export class MobileMenuDrawerComponent {
  private router = inject(Router);
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  navItems = NAV_ITEMS;

  isExtraActive(item: (typeof NAV_ITEMS)[0]): boolean {
    if (item.path !== '/about') return false;
    return ABOUT_SECTION_PREFIXES.some(p => this.router.url.startsWith(p));
  }
}
