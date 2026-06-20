# Architecture — Trường Mầm Non Ánh Dương

## Overview
Vietnamese kindergarten introduction website. No backend, no auth, mock data only.
Built with Angular 21 (standalone), Tailwind CSS v3, Swiper 12.

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | HomeComponent | Hero slideshow, overview, teachers, news, CTA |
| `/gioi-thieu` | AboutComponent | History, management, teachers, facilities |
| `/hoat-dong-giao-duc` | ActivitiesComponent | Programs + album links |
| `/thu-vien` | LibraryComponent | Age-grouped albums + learning materials |
| `/thu-vien/album/:id` | AlbumDetailComponent | Full photo grid for one album |
| `/lien-he` | ContactComponent | Address, phone, email, map |

All routes use lazy `loadComponent`. Scroll restoration enabled via `withInMemoryScrolling`.

---

## Component Tree

```
App (root shell)
  HeaderComponent
    NavMenuComponent          — desktop horizontal nav
    MobileMenuDrawerComponent — slide-in overlay (animated)
  <router-outlet>
  FooterComponent

Shared components (src/app/shared/):
  SlideshowComponent          — Swiper Web Component wrapper
  PageHeroComponent           — inner page banner with gradient + decorative circles
  SectionHeadingComponent     — title + accent bar + optional badge/subtitle
  BreadcrumbComponent         — trail navigation for album detail
  ImageGalleryGridComponent   — responsive 2–4 col photo grid with hover overlay
  CardNewsComponent           — article card: image, category badge, date, excerpt
  CardTeacherComponent        — staff card: circular photo, role, bio, qualifications
  CardProgramComponent        — program card: image, emoji icon, description, CTA
  CardAlbumComponent          — album card: cover image overlay with title + count
  TagBadgeComponent           — colored pill tag

Pages (src/app/pages/):
  HomeComponent
    SlideshowComponent (hero)
    QuickStatsComponent         — 4 animated stat counters
    SchoolOverviewComponent     — 2-col layout: text + image collage
    TeacherHighlightsComponent  — featured staff cards (lavender theme)
    LatestNewsComponent         — 3 latest news cards
    RegistrationCtaComponent    — full-width gradient CTA banner

  AboutComponent
    PageHeroComponent
    SchoolHistoryComponent      — alternating timeline
    ManagementBoardComponent    — principal + vice-principal cards
    TeacherGroupsComponent      — teachers grouped by class (Mầm/Chồi/Lá)
    FacilitiesSectionComponent  — facility cards + photo grid

  ActivitiesComponent
    PageHeroComponent
    ProgramListComponent        — 6 program cards (mint theme)
    ActivityAlbumLinksComponent — album cards linking to /thu-vien

  LibraryComponent
    PageHeroComponent
    AgeGroupTabsComponent       — 3-tab switcher (3/4/5 tuổi), signal-based
    LearningMaterialsComponent  — downloadable PDF links grid

  AlbumDetailComponent
    BreadcrumbComponent
    ImageGalleryGridComponent

  ContactComponent
    PageHeroComponent
    ContactInfoCardComponent    — address, phones, email, hours, social icons
    GoogleMapEmbedComponent     — DomSanitizer iframe wrapper
```

---

## Data Layer

### Models (`src/app/core/models/`)
`NewsArticle`, `StaffMember`, `EducationalProgram`, `GalleryAlbum + GalleryImage`,
`Facility`, `ContactInfo`, `HeroSlide` — all exported from `index.ts` barrel.

### Mock Data (`src/app/core/data/`)
TypeScript const arrays — type-safe, no JSON files:
- `news.data.ts` — 8 articles (4 categories)
- `staff.data.ts` — 12 staff (principal, vice, 9 teachers, admin)
- `programs.data.ts` — 6 programs
- `gallery.data.ts` — 9 albums (3 per age group), photos via picsum.photos
- `facilities.data.ts` — 6 facilities
- `contact.data.ts` — single ContactInfo object
- `slides.data.ts` — 5 hero slides

### Services (`src/app/core/services/`)
All `Injectable({ providedIn: 'root' })`, synchronous returns. No HTTP client.

---

## Design System

### Color Palette (Tailwind extensions)
| Token | Use |
|---|---|
| `peach` | Primary CTA, Home accent |
| `lavender` | About page, teacher cards |
| `mint` | Activities page, program cards |
| `sky` | Library page, news badges |
| `lemon` | Album section accents |
| `warm` | Neutral backgrounds |

### Typography
- Headings: **Fredoka** / Baloo 2 (Google Fonts)
- Body: **Be Vietnam Pro** / Nunito

### Utilities
- `.btn-primary / .btn-secondary / .btn-outline` — global button classes
- `.card-base / .card-hover` — reusable card shell
- `.section-container` — `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `.section-padding` — `py-16 md:py-24`

---

## Key Decisions
- **Swiper via Web Components**: `register()` in `main.ts`, `CUSTOM_ELEMENTS_SCHEMA` per component
- **picsum.photos**: all images use `seed/` URLs — no local asset files needed
- **Angular Signals**: used inline for tab state and header scroll/menu state (no NgRx)
- **DomSanitizer**: GoogleMapEmbedComponent uses `bypassSecurityTrustResourceUrl`
- **Tailwind v3**: chosen over v4 for stable Angular CLI + PostCSS integration
