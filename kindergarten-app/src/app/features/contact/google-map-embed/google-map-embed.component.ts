import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Component({
  selector: 'app-google-map-embed',
  standalone: true,
  templateUrl: './google-map-embed.component.html',
  styleUrl: './google-map-embed.component.css',
})
export class GoogleMapEmbedComponent {
  @Input() set url(v: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(v);
  }
  private sanitizer = inject(DomSanitizer);
  safeUrl!: SafeResourceUrl;
}
