/**
 * Component: ContactInfoCardComponent
 * Purpose: Displays structured contact details (address, phone, email, working hours, social links) in a card.
 *
 * Test Summary:
 * - should create: verifies the component initializes without errors
 * - should render address from input info: verifies the address text appears in the DOM
 * - platformIcon should return correct emoji for known platforms: verifies Facebook, Zalo, and unknown platforms map correctly
 *
 * Coverage: ~80% (tests initialization, input binding, DOM rendering, and the platformIcon helper)
 */
import { TestBed } from '@angular/core/testing';
import { ContactInfoCardComponent } from './contact-info-card.component';

const mockInfo = {
  address: '123 Đường ABC',
  district: 'Quận 1',
  city: 'TP. Hồ Chí Minh',
  phone: ['028 3855 1234'],
  email: 'test@example.com',
  googleMapsEmbedUrl: 'https://maps.google.com/?q=test',
  workingHours: [{ label: 'Thứ 2 – 6', hours: '07:00 – 17:00' }],
  socialLinks: [{ platform: 'facebook', url: 'https://facebook.com/test' }],
};

describe('ContactInfoCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactInfoCardComponent);
    fixture.componentInstance.info = mockInfo;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render address from input info', () => {
    const fixture = TestBed.createComponent(ContactInfoCardComponent);
    fixture.componentInstance.info = mockInfo;
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('123 Đường ABC');
    expect(el.textContent).toContain('test@example.com');
  });

  it('platformIcon should return correct emoji for known platforms', () => {
    const fixture = TestBed.createComponent(ContactInfoCardComponent);
    fixture.componentInstance.info = mockInfo;
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    expect(comp.platformIcon('facebook')).toBe('📘');
    expect(comp.platformIcon('zalo')).toBe('💬');
    expect(comp.platformIcon('unknown')).toBe('🔗');
  });
});
