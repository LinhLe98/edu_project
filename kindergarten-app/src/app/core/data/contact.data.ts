import { ContactInfo } from '../models';

export const CONTACT_DATA: ContactInfo = {
  schoolName: 'Trường Mầm Non Ánh Dương',
  address: '123 Đường Nguyễn Văn Cừ',
  district: 'Quận 5',
  city: 'TP. Hồ Chí Minh',
  phones: ['028 3855 1234', '0909 123 456'],
  email: 'contact@mannonanhduong.edu.vn',
  workingHours: [
    { label: 'Thứ 2 – Thứ 6', hours: '6:30 – 17:30' },
    { label: 'Thứ 7', hours: '7:00 – 11:30' },
    { label: 'Chủ Nhật', hours: 'Nghỉ' },
  ],
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d106.6634!3d10.7626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzQ1LjQiTiAxMDbCsDM5JzQ4LjIiRQ!5e0!3m2!1svi!2svn!4v1234567890',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/mannonanhduong', handle: '@mannonanhduong' },
    { platform: 'zalo', url: 'https://zalo.me/0909123456', handle: 'Ánh Dương School' },
    { platform: 'youtube', url: 'https://youtube.com/@mannonanhduong', handle: '@mannonanhduong' },
  ],
};
