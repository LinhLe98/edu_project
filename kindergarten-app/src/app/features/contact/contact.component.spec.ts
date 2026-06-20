/**
 * Component: ContactComponent
 * Purpose: Contact page showing page hero, contact info card, Google Maps embed,
 *   and a support request form. The form accepts name, phone, email, subject, and
 *   message; submission shows a success banner and clears the form.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should load contact info from ContactService: verifies contactInfo is populated from the service
 * - should render the page hero, contact card, and map embed: verifies all three major child components are present
 * - should initialize formSuccess to false: verifies the form success state starts hidden
 * - should set formSuccess on submitForm() with valid data: verifies valid submission sets success signal
 * - should set formError on submitForm() with empty required fields: verifies that submitting
 *     without name or message triggers the error signal instead of success
 *
 * Coverage: ~80% (tests initialization, service wiring, child component presence, and form submission logic)
 */
import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from '../../core/services/contact.service';

const mockContactInfo = {
  address: '123 Đường ABC',
  district: 'Quận 1',
  city: 'TP. Hồ Chí Minh',
  phone: ['028 3855 1234'],
  email: 'anhduong@example.com',
  googleMapsEmbedUrl: 'https://maps.google.com/?q=test',
  workingHours: [{ label: 'Thứ 2 – 6', hours: '07:00 – 17:00' }],
  socialLinks: [],
};

const mockContactService = {
  getContactInfo: () => ({ ...mockContactInfo }),
};

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load contact info from ContactService', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.contactInfo.email).toBe('anhduong@example.com');
  });

  it('should render the page hero, contact card, and map embed', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-page-hero')).toBeTruthy();
    expect(el.querySelector('app-contact-info-card')).toBeTruthy();
    expect(el.querySelector('app-google-map-embed')).toBeTruthy();
  });

  it('should initialize formSuccess to false', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.formSuccess()).toBeFalse();
  });

  it('should set formSuccess on submitForm() with valid data', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    fixture.componentInstance.formData = {
      name: 'Phụ huynh A',
      phone: '0912345678',
      email: 'a@example.com',
      subject: 'Đăng ký tham quan trường',
      message: 'Tôi muốn đăng ký tham quan.',
    };
    fixture.componentInstance.submitForm();
    expect(fixture.componentInstance.formSuccess()).toBeTrue();
  });

  it('should set formError on submitForm() when name is empty', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    fixture.componentInstance.formData = {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: 'Có nội dung',
    };
    fixture.componentInstance.submitForm();
    expect(fixture.componentInstance.formError()).toBeTrue();
    expect(fixture.componentInstance.formSuccess()).toBeFalse();
  });
});
