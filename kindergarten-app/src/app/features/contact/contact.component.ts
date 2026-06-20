import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeroComponent } from '../../shared/page-hero/page-hero.component';
import { ContactInfoCardComponent } from './contact-info-card/contact-info-card.component';
import { GoogleMapEmbedComponent } from './google-map-embed/google-map-embed.component';
import { ContactService } from '../../core/services/contact.service';

export interface SupportRequest {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, PageHeroComponent, ContactInfoCardComponent, GoogleMapEmbedComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private contactService = inject(ContactService);
  contactInfo = toSignal(this.contactService.getContactInfo());

  formData: SupportRequest = { name: '', phone: '', email: '', subject: '', message: '' };
  formSuccess = signal(false);
  formError = signal(false);

  readonly subjectOptions = [
    'Đăng ký tham quan trường',
    'Thông tin học phí',
    'Thông tin chương trình học',
    'Thủ tục nhập học',
    'Khác',
  ];

  submitForm() {
    if (!this.formData.name.trim() || !this.formData.message.trim()) {
      this.formError.set(true);
      setTimeout(() => this.formError.set(false), 3000);
      return;
    }
    this.contactService.submitSupportRequest(this.formData).subscribe({
      next: () => {
        this.formSuccess.set(true);
        this.formData = { name: '', phone: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.formError.set(true);
        setTimeout(() => this.formError.set(false), 3000);
      },
    });
  }
}
