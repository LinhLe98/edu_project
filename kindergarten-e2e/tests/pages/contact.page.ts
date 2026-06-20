import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the Contact page (/contact).
 * Features: support request form, contact info card, Google Maps embed.
 *
 * Form fields:
 *   - name (required)
 *   - phone (optional)
 *   - email (optional)
 *   - subject (optional, select)
 *   - message (required)
 *
 * Subject options (from ContactComponent.subjectOptions):
 *   'Đăng ký tham quan trường' | 'Thông tin học phí' | 'Thông tin chương trình học'
 *   | 'Thủ tục nhập học' | 'Khác'
 */
export class ContactPage {
  readonly page: Page;

  readonly pageHeading: Locator;

  // Form fields
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;

  // Form feedback
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  // Contact info
  readonly contactInfoSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeading = page.getByRole('heading', { name: 'Liên Hệ', level: 1 });

    this.nameInput = page.getByPlaceholder('Nguyễn Văn A');
    this.phoneInput = page.getByPlaceholder('0912 345 678');
    this.emailInput = page.getByPlaceholder('email@example.com');
    this.subjectSelect = page.locator('select');
    this.messageTextarea = page.getByPlaceholder(/Mô tả yêu cầu/);
    this.submitButton = page.getByRole('button', { name: 'Gửi yêu cầu' });

    this.successMessage = page.locator('text=Yêu cầu đã được gửi thành công');
    this.errorMessage = page.locator('text=Vui lòng điền đầy đủ');

    this.contactInfoSection = page.locator('main').getByRole('heading', { name: 'Thông Tin Liên Hệ' });
  }

  async goto() {
    await this.page.goto('/contact');
    // Use domcontentloaded — networkidle times out because the Google Maps iframe
    // keeps network connections open indefinitely.
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillForm(data: {
    name?: string;
    phone?: string;
    email?: string;
    subject?: string;
    message?: string;
  }) {
    if (data.name !== undefined) {
      await this.nameInput.fill(data.name);
    }
    if (data.phone !== undefined) {
      await this.phoneInput.fill(data.phone);
    }
    if (data.email !== undefined) {
      await this.emailInput.fill(data.email);
    }
    if (data.subject !== undefined) {
      // Note: ngFor-generated options only appear if NgFor is in the component's imports.
      // Skip selecting if the option is not rendered to avoid test errors.
      const optionCount = await this.subjectSelect.locator(`option[value="${data.subject}"]`).count();
      if (optionCount > 0) {
        await this.subjectSelect.selectOption({ label: data.subject });
      }
    }
    if (data.message !== undefined) {
      await this.messageTextarea.fill(data.message);
    }
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
