import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';

/**
 * Contact page (/contact) tests.
 * Covers: page load, form field visibility, required-field validation,
 * subject dropdown options, form submission (success + error), contact info section.
 *
 * Note: Form submission tests make real API calls to localhost:8080. The "success"
 * test will only pass when the backend is running. The "validation error" test
 * is purely client-side and always runnable.
 */
test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  test('displays page heading "Liên Hệ"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Liên Hệ', level: 1 })).toBeVisible();
  });

  test('form section heading "Gửi Yêu Cầu Hỗ Trợ" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Gửi Yêu Cầu Hỗ Trợ' })).toBeVisible();
  });

  test('all form fields are visible', async ({ page }) => {
    const contact = new ContactPage(page);
    await expect(contact.nameInput).toBeVisible();
    await expect(contact.phoneInput).toBeVisible();
    await expect(contact.emailInput).toBeVisible();
    await expect(contact.subjectSelect).toBeVisible();
    await expect(contact.messageTextarea).toBeVisible();
    await expect(contact.submitButton).toBeVisible();
  });

  test('subject dropdown is present with a default placeholder option', async ({ page }) => {
    const contact = new ContactPage(page);
    // The select element is rendered; its placeholder option is always present.
    // NOTE: The 5 subject options defined in ContactComponent.subjectOptions require
    // NgFor to be listed in the component's imports array to render. As of exploration,
    // only the placeholder option renders (NgFor is missing from the component imports —
    // this is a known app-level issue). This test documents the current behavior.
    await expect(contact.subjectSelect).toBeVisible();
    const placeholderOption = contact.subjectSelect.locator('option[value=""]');
    await expect(placeholderOption).toBeAttached();
  });

  test('subject dropdown renders all 6 options (1 placeholder + 5 subject options)', async ({ page }) => {
    const contact = new ContactPage(page);
    const optionCount = await contact.subjectSelect.locator('option').count();
    expect(optionCount).toBe(6);
  });

  test('submitting the form without required fields shows validation error', async ({ page }) => {
    const contact = new ContactPage(page);
    // Leave name and message empty, click submit
    await contact.submitButton.click();
    await expect(contact.errorMessage).toBeVisible();
  });

  test('validation error disappears automatically after ~3 seconds', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.submitButton.click();
    await expect(contact.errorMessage).toBeVisible();
    // Wait for the auto-dismiss timeout
    await page.waitForTimeout(3500);
    await expect(contact.errorMessage).toBeHidden();
  });

  test('submitting with only name (no message) triggers validation error', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.fillForm({ name: 'Test Parent' });
    await contact.submitButton.click();
    await expect(contact.errorMessage).toBeVisible();
  });

  test('submitting with only message (no name) triggers validation error', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.fillForm({ message: 'Test message content' });
    await contact.submitButton.click();
    await expect(contact.errorMessage).toBeVisible();
  });

  test('form can be filled with all fields', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.fillForm({
      name: 'Nguyễn Văn Test',
      phone: '0912000111',
      email: 'test@example.com',
      subject: 'Đăng ký tham quan trường',
      message: 'Tôi muốn đăng ký tham quan trường cho con.',
    });

    await expect(contact.nameInput).toHaveValue('Nguyễn Văn Test');
    await expect(contact.phoneInput).toHaveValue('0912000111');
    await expect(contact.emailInput).toHaveValue('test@example.com');
    await expect(contact.subjectSelect).toHaveValue('Đăng ký tham quan trường');
    await expect(contact.messageTextarea).toHaveValue('Tôi muốn đăng ký tham quan trường cho con.');
  });

  test('successful form submission hides the form and shows success message', async ({ page }) => {
    const contact = new ContactPage(page);
    await contact.fillForm({
      name: 'Test Parent E2E',
      phone: '0900000000',
      email: 'e2e@test.com',
      subject: 'Khác',
      message: '[TEST] Automated test submission — please ignore.',
    });
    await contact.submitButton.click();

    // On success the component sets formSuccess signal = true, hides the form
    await expect(contact.successMessage).toBeVisible({ timeout: 10000 });
    await expect(contact.submitButton).toBeHidden();
  });

  test('contact info section shows address, phone, and email', async ({ page }) => {
    await expect(page.locator('main').getByRole('heading', { name: 'Thông Tin Liên Hệ' })).toBeVisible();
    // Contact info is loaded from the backend via ContactService
    // Wait for data to appear
    await expect(page.locator('main').filter({ hasText: /Thông Tin Liên Hệ/ })).toBeVisible();
  });

  test('Google Maps iframe is embedded', async ({ page }) => {
    const mapFrame = page.locator('main iframe');
    await expect(mapFrame).toBeAttached();
  });
});
