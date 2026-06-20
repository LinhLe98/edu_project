import { Component, signal, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MobileMenuDrawerComponent } from './mobile-menu-drawer/mobile-menu-drawer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, NavMenuComponent, MobileMenuDrawerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }
}
