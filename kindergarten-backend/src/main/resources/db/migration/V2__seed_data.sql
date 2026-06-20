-- ============================================================
-- Hero Slides
-- ============================================================
INSERT INTO hero_slides (id, image_url, alt_text, heading, subheading, cta_label, cta_link, cta_fragment, order_index)
VALUES
  ('slide-1', 'https://picsum.photos/seed/hero1/1400/700', 'Hero 1', 'Nơi Ươm Mầm Tương Lai', 'Chào mừng đến trường mầm non Ánh Dương', 'Tìm hiểu thêm', '/about', NULL, 1),
  ('slide-2', 'https://picsum.photos/seed/hero2/1400/700', 'Hero 2', 'Lớp Học Hiện Đại, Ấm Áp', 'Cơ sở vật chất hiện đại, môi trường học tập thân thiện', 'Khám phá cơ sở', '/about', 'facilities-section', 2),
  ('slide-3', 'https://picsum.photos/seed/hero3/1400/700', 'Hero 3', 'Vui Chơi Là Học Tập', 'Phương pháp giáo dục tiên tiến qua trò chơi sáng tạo', 'Xem hoạt động', '/activities', NULL, 3),
  ('slide-4', 'https://picsum.photos/seed/hero4/1400/700', 'Hero 4', 'Đội Ngũ Giáo Viên Tận Tâm', 'Đội ngũ giáo viên giàu kinh nghiệm và tâm huyết', 'Gặp gỡ giáo viên', '/about', 'teacher-groups', 4),
  ('slide-5', 'https://picsum.photos/seed/hero5/1400/700', 'Hero 5', 'Mùa Hè Rực Rỡ 2025', 'Chương trình hè đặc sắc với nhiều hoạt động bổ ích', 'Liên hệ ngay', '/contact', NULL, 5);

-- ============================================================
-- Staff Members
-- ============================================================
INSERT INTO staff_members (id, full_name, role, department, photo, bio, featured, group_role, class_info, experience, email)
VALUES
  ('staff-1', 'Nguyễn Thị Hương', 'Hiệu Trưởng', 'BAN_GIAM_HIEU', 'https://picsum.photos/seed/staff1/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', TRUE, NULL, NULL, 5, 'huong.nguyen@mannonanhduong.edu.vn'),
  ('staff-2', 'Trần Thị Mai', 'Phó Hiệu Trưởng', 'BAN_GIAM_HIEU', 'https://picsum.photos/seed/staff2/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', TRUE, NULL, NULL, 6, 'mai.tran@mannonanhduong.edu.vn'),
  ('staff-3', 'Lê Thị Thu', 'Tổ Trưởng Lớp Lá', 'TO_GIAO_VIEN_LA', 'https://picsum.photos/seed/staff3/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', TRUE, 'LEADER', 'Lớp Lá 1', 7, 'thu.le@mannonanhduong.edu.vn'),
  ('staff-4', 'Phạm Thị Lan', 'Giáo Viên Lớp Lá', 'TO_GIAO_VIEN_LA', 'https://picsum.photos/seed/staff4/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Lá 2', 8, 'lan.pham@mannonanhduong.edu.vn'),
  ('staff-5', 'Hoàng Thị Nhung', 'Giáo Viên Lớp Lá', 'TO_GIAO_VIEN_LA', 'https://picsum.photos/seed/staff5/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Lá 3', 9, 'nhung.hoang@mannonanhduong.edu.vn'),
  ('staff-6', 'Vũ Thị Hoa', 'Tổ Trưởng Lớp Chồi', 'TO_GIAO_VIEN_CHOI', 'https://picsum.photos/seed/staff6/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', TRUE, 'LEADER', 'Lớp Chồi 1', 10, 'hoa.vu@mannonanhduong.edu.vn'),
  ('staff-7', 'Đặng Thị Kim', 'Giáo Viên Lớp Chồi', 'TO_GIAO_VIEN_CHOI', 'https://picsum.photos/seed/staff7/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Chồi 2', 11, 'kim.dang@mannonanhduong.edu.vn'),
  ('staff-8', 'Bùi Thị Trang', 'Giáo Viên Lớp Chồi', 'TO_GIAO_VIEN_CHOI', 'https://picsum.photos/seed/staff8/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Chồi 3', 12, 'trang.bui@mannonanhduong.edu.vn'),
  ('staff-9', 'Ngô Thị Linh', 'Tổ Trưởng Lớp Mầm', 'TO_GIAO_VIEN_MAM', 'https://picsum.photos/seed/staff9/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', TRUE, 'LEADER', 'Lớp Mầm 1', 13, 'linh.ngo@mannonanhduong.edu.vn'),
  ('staff-10', 'Trịnh Thị Nga', 'Giáo Viên Lớp Mầm', 'TO_GIAO_VIEN_MAM', 'https://picsum.photos/seed/staff10/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Mầm 2', 14, 'nga.trinh@mannonanhduong.edu.vn'),
  ('staff-11', 'Cao Thị Oanh', 'Giáo Viên Lớp Mầm', 'TO_GIAO_VIEN_MAM', 'https://picsum.photos/seed/staff11/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, 'VICE_LEADER', 'Lớp Mầm 3', 15, 'oanh.cao@mannonanhduong.edu.vn'),
  ('staff-12', 'Đinh Thị Yến', 'Nhân Viên Hành Chính', 'TO_NHAN_VIEN', 'https://picsum.photos/seed/staff12/400/400', 'Giáo viên tận tâm với nhiều năm kinh nghiệm giảng dạy.', FALSE, NULL, NULL, 16, 'yen.dinh@mannonanhduong.edu.vn');

-- Staff qualifications
INSERT INTO staff_qualifications (staff_id, qualification) VALUES
  ('staff-1', 'Cử nhân Sư Phạm Mầm Non'), ('staff-1', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-2', 'Cử nhân Sư Phạm Mầm Non'), ('staff-2', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-3', 'Cử nhân Sư Phạm Mầm Non'), ('staff-3', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-4', 'Cử nhân Sư Phạm Mầm Non'), ('staff-4', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-5', 'Cử nhân Sư Phạm Mầm Non'), ('staff-5', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-6', 'Cử nhân Sư Phạm Mầm Non'), ('staff-6', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-7', 'Cử nhân Sư Phạm Mầm Non'), ('staff-7', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-8', 'Cử nhân Sư Phạm Mầm Non'), ('staff-8', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-9', 'Cử nhân Sư Phạm Mầm Non'), ('staff-9', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-10', 'Cử nhân Sư Phạm Mầm Non'), ('staff-10', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-11', 'Cử nhân Sư Phạm Mầm Non'), ('staff-11', 'Chứng chỉ Nghiệp vụ Sư phạm'),
  ('staff-12', 'Cử nhân Sư Phạm Mầm Non'), ('staff-12', 'Chứng chỉ Nghiệp vụ Sư phạm');

-- Staff specialties
INSERT INTO staff_specialties (staff_id, specialty) VALUES
  ('staff-1', 'Quản lý giáo dục'), ('staff-1', 'Phát triển chương trình'),
  ('staff-2', 'Chăm sóc trẻ'), ('staff-2', 'Tâm lý giáo dục'),
  ('staff-3', 'Phát triển ngôn ngữ'), ('staff-3', 'Đọc sách'),
  ('staff-4', 'Nghệ thuật'), ('staff-4', 'Âm nhạc'),
  ('staff-5', 'Thể chất'), ('staff-5', 'Vui chơi ngoài trời'),
  ('staff-6', 'Toán tư duy'), ('staff-6', 'Kỹ năng sống'),
  ('staff-7', 'Tiếng Anh'), ('staff-7', 'Sáng tạo'),
  ('staff-8', 'Dinh dưỡng'), ('staff-8', 'Sức khỏe'),
  ('staff-9', 'Âm nhạc'), ('staff-9', 'Múa'),
  ('staff-10', 'Vẽ tranh'), ('staff-10', 'Thủ công'),
  ('staff-11', 'Kể chuyện'), ('staff-11', 'Đóng kịch'),
  ('staff-12', 'Hành chính'), ('staff-12', 'Tư vấn phụ huynh');

-- ============================================================
-- News Articles
-- ============================================================
INSERT INTO news_articles (id, title, slug, excerpt, content, cover_image, published_at, category, featured)
VALUES
  ('news-1', 'Khai Giảng Năm Học Mới 2025-2026', 'khai-giang-nam-hoc-moi-2025-2026', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news1/800/500', '2025-08-20T08:00:00', 'SU_KIEN', TRUE),
  ('news-2', 'Thông Báo Tuyển Sinh 2025-2026', 'thong-bao-tuyen-sinh-2025-2026', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news2/800/500', '2025-07-15T08:00:00', 'THONG_BAO', TRUE),
  ('news-3', 'Ngày Hội Trung Thu 2025', 'ngay-hoi-trung-thu-2025', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news3/800/500', '2025-09-10T08:00:00', 'HOAT_DONG', TRUE),
  ('news-4', 'Tham Quan Vườn Thú Sài Gòn 2025', 'tham-quan-vuon-thu-sai-gon-2025', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news4/800/500', '2025-10-05T08:00:00', 'HOAT_DONG', FALSE),
  ('news-5', 'Chương Trình Bé Khỏe Bé Ngoan', 'chuong-trinh-be-khoe-be-ngoan', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news5/800/500', '2025-11-20T08:00:00', 'TIN_TUC', FALSE),
  ('news-6', 'Lễ Giáng Sinh 2025', 'le-giang-sinh-2025', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news6/800/500', '2025-12-22T08:00:00', 'SU_KIEN', FALSE),
  ('news-7', 'Lịch Nghỉ Tết Nguyên Đán 2026', 'lich-nghi-tet-nguyen-dan-2026', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news7/800/500', '2026-01-10T08:00:00', 'THONG_BAO', FALSE),
  ('news-8', 'Tổng Kết Năm Học 2024-2025', 'tong-ket-nam-hoc-2024-2025', 'Nội dung tóm tắt bài viết.', '<p>Nội dung đầy đủ bài viết...</p>', 'https://picsum.photos/seed/news8/800/500', '2025-05-30T08:00:00', 'SU_KIEN', FALSE);

INSERT INTO news_tags (article_id, tag) VALUES
  ('news-1', 'trường học'), ('news-1', 'sự kiện'),
  ('news-2', 'trường học'), ('news-2', 'sự kiện'),
  ('news-3', 'trường học'), ('news-3', 'sự kiện'),
  ('news-4', 'trường học'), ('news-4', 'sự kiện'),
  ('news-5', 'trường học'), ('news-5', 'sự kiện'),
  ('news-6', 'trường học'), ('news-6', 'sự kiện'),
  ('news-7', 'trường học'), ('news-7', 'sự kiện'),
  ('news-8', 'trường học'), ('news-8', 'sự kiện');

-- ============================================================
-- Gallery Albums
-- ============================================================
INSERT INTO gallery_albums (id, title, description, cover_image, age_group, category, created_at, updated_at)
VALUES
  ('album-1', 'Giờ Đọc Sách – Lớp Mầm', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album1/600/400', 'THREE_TUOI', 'HOAT_DONG_HOC', '2025-09-01T00:00:00', '2025-09-01T00:00:00'),
  ('album-2', 'Vẽ Tranh Nghệ Thuật – Lớp Mầm', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album2/600/400', 'THREE_TUOI', 'HOAT_DONG_HOC', '2025-09-05T00:00:00', '2025-09-05T00:00:00'),
  ('album-3', 'Vui Chơi Ngoài Trời – Lớp Mầm', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album3/600/400', 'THREE_TUOI', 'VUI_CHOI', '2025-09-10T00:00:00', '2025-09-10T00:00:00'),
  ('album-4', 'Kể Chuyện Sáng Tạo – Lớp Chồi', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album4/600/400', 'FOUR_TUOI', 'HOAT_DONG_HOC', '2025-09-15T00:00:00', '2025-09-15T00:00:00'),
  ('album-5', 'Âm Nhạc & Múa – Lớp Chồi', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album5/600/400', 'FOUR_TUOI', 'LE_HOI', '2025-09-20T00:00:00', '2025-09-20T00:00:00'),
  ('album-6', 'Toán Tư Duy – Lớp Chồi', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album6/600/400', 'FOUR_TUOI', 'HOAT_DONG_HOC', '2025-09-25T00:00:00', '2025-09-25T00:00:00'),
  ('album-7', 'Kỹ Năng Sống – Lớp Lá', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album7/600/400', 'FIVE_TUOI', 'HOAT_DONG_HOC', '2025-10-01T00:00:00', '2025-10-01T00:00:00'),
  ('album-8', 'Tiếng Anh Vui – Lớp Lá', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album8/600/400', 'FIVE_TUOI', 'HOAT_DONG_HOC', '2025-10-05T00:00:00', '2025-10-05T00:00:00'),
  ('album-9', 'Lễ Tốt Nghiệp Lớp Lá 2025', 'Album ảnh hoạt động học sinh.', 'https://picsum.photos/seed/album9/600/400', 'FIVE_TUOI', 'LE_HOI', '2025-10-10T00:00:00', '2025-10-10T00:00:00');

-- Gallery images for album-1 (8 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-1-photo-1','album-1','https://picsum.photos/seed/album1photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-1-photo-2','album-1','https://picsum.photos/seed/album1photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-1-photo-3','album-1','https://picsum.photos/seed/album1photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-1-photo-4','album-1','https://picsum.photos/seed/album1photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-1-photo-5','album-1','https://picsum.photos/seed/album1photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-1-photo-6','album-1','https://picsum.photos/seed/album1photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-1-photo-7','album-1','https://picsum.photos/seed/album1photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-1-photo-8','album-1','https://picsum.photos/seed/album1photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600);

-- Gallery images for album-2 (10 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-2-photo-1','album-2','https://picsum.photos/seed/album2photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-2-photo-2','album-2','https://picsum.photos/seed/album2photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-2-photo-3','album-2','https://picsum.photos/seed/album2photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-2-photo-4','album-2','https://picsum.photos/seed/album2photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-2-photo-5','album-2','https://picsum.photos/seed/album2photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-2-photo-6','album-2','https://picsum.photos/seed/album2photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-2-photo-7','album-2','https://picsum.photos/seed/album2photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-2-photo-8','album-2','https://picsum.photos/seed/album2photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-2-photo-9','album-2','https://picsum.photos/seed/album2photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-2-photo-10','album-2','https://picsum.photos/seed/album2photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600);

-- Gallery images for album-3 (12 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-3-photo-1','album-3','https://picsum.photos/seed/album3photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-3-photo-2','album-3','https://picsum.photos/seed/album3photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-3-photo-3','album-3','https://picsum.photos/seed/album3photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-3-photo-4','album-3','https://picsum.photos/seed/album3photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-3-photo-5','album-3','https://picsum.photos/seed/album3photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-3-photo-6','album-3','https://picsum.photos/seed/album3photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-3-photo-7','album-3','https://picsum.photos/seed/album3photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-3-photo-8','album-3','https://picsum.photos/seed/album3photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-3-photo-9','album-3','https://picsum.photos/seed/album3photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-3-photo-10','album-3','https://picsum.photos/seed/album3photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600),
  ('album-3-photo-11','album-3','https://picsum.photos/seed/album3photo11/800/600','Ảnh 11','Ảnh hoạt động 11',800,600),
  ('album-3-photo-12','album-3','https://picsum.photos/seed/album3photo12/800/600','Ảnh 12','Ảnh hoạt động 12',800,600);

-- Gallery images for album-4 (9 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-4-photo-1','album-4','https://picsum.photos/seed/album4photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-4-photo-2','album-4','https://picsum.photos/seed/album4photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-4-photo-3','album-4','https://picsum.photos/seed/album4photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-4-photo-4','album-4','https://picsum.photos/seed/album4photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-4-photo-5','album-4','https://picsum.photos/seed/album4photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-4-photo-6','album-4','https://picsum.photos/seed/album4photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-4-photo-7','album-4','https://picsum.photos/seed/album4photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-4-photo-8','album-4','https://picsum.photos/seed/album4photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-4-photo-9','album-4','https://picsum.photos/seed/album4photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600);

-- Gallery images for album-5 (11 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-5-photo-1','album-5','https://picsum.photos/seed/album5photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-5-photo-2','album-5','https://picsum.photos/seed/album5photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-5-photo-3','album-5','https://picsum.photos/seed/album5photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-5-photo-4','album-5','https://picsum.photos/seed/album5photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-5-photo-5','album-5','https://picsum.photos/seed/album5photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-5-photo-6','album-5','https://picsum.photos/seed/album5photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-5-photo-7','album-5','https://picsum.photos/seed/album5photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-5-photo-8','album-5','https://picsum.photos/seed/album5photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-5-photo-9','album-5','https://picsum.photos/seed/album5photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-5-photo-10','album-5','https://picsum.photos/seed/album5photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600),
  ('album-5-photo-11','album-5','https://picsum.photos/seed/album5photo11/800/600','Ảnh 11','Ảnh hoạt động 11',800,600);

-- Gallery images for album-6 (8 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-6-photo-1','album-6','https://picsum.photos/seed/album6photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-6-photo-2','album-6','https://picsum.photos/seed/album6photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-6-photo-3','album-6','https://picsum.photos/seed/album6photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-6-photo-4','album-6','https://picsum.photos/seed/album6photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-6-photo-5','album-6','https://picsum.photos/seed/album6photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-6-photo-6','album-6','https://picsum.photos/seed/album6photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-6-photo-7','album-6','https://picsum.photos/seed/album6photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-6-photo-8','album-6','https://picsum.photos/seed/album6photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600);

-- Gallery images for album-7 (14 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-7-photo-1','album-7','https://picsum.photos/seed/album7photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-7-photo-2','album-7','https://picsum.photos/seed/album7photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-7-photo-3','album-7','https://picsum.photos/seed/album7photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-7-photo-4','album-7','https://picsum.photos/seed/album7photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-7-photo-5','album-7','https://picsum.photos/seed/album7photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-7-photo-6','album-7','https://picsum.photos/seed/album7photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-7-photo-7','album-7','https://picsum.photos/seed/album7photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-7-photo-8','album-7','https://picsum.photos/seed/album7photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-7-photo-9','album-7','https://picsum.photos/seed/album7photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-7-photo-10','album-7','https://picsum.photos/seed/album7photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600),
  ('album-7-photo-11','album-7','https://picsum.photos/seed/album7photo11/800/600','Ảnh 11','Ảnh hoạt động 11',800,600),
  ('album-7-photo-12','album-7','https://picsum.photos/seed/album7photo12/800/600','Ảnh 12','Ảnh hoạt động 12',800,600),
  ('album-7-photo-13','album-7','https://picsum.photos/seed/album7photo13/800/600','Ảnh 13','Ảnh hoạt động 13',800,600),
  ('album-7-photo-14','album-7','https://picsum.photos/seed/album7photo14/800/600','Ảnh 14','Ảnh hoạt động 14',800,600);

-- Gallery images for album-8 (10 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-8-photo-1','album-8','https://picsum.photos/seed/album8photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-8-photo-2','album-8','https://picsum.photos/seed/album8photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-8-photo-3','album-8','https://picsum.photos/seed/album8photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-8-photo-4','album-8','https://picsum.photos/seed/album8photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-8-photo-5','album-8','https://picsum.photos/seed/album8photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-8-photo-6','album-8','https://picsum.photos/seed/album8photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-8-photo-7','album-8','https://picsum.photos/seed/album8photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-8-photo-8','album-8','https://picsum.photos/seed/album8photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-8-photo-9','album-8','https://picsum.photos/seed/album8photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-8-photo-10','album-8','https://picsum.photos/seed/album8photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600);

-- Gallery images for album-9 (16 photos)
INSERT INTO gallery_images (id, album_id, src, alt, caption, width, height) VALUES
  ('album-9-photo-1','album-9','https://picsum.photos/seed/album9photo1/800/600','Ảnh 1','Ảnh hoạt động 1',800,600),
  ('album-9-photo-2','album-9','https://picsum.photos/seed/album9photo2/800/600','Ảnh 2','Ảnh hoạt động 2',800,600),
  ('album-9-photo-3','album-9','https://picsum.photos/seed/album9photo3/800/600','Ảnh 3','Ảnh hoạt động 3',800,600),
  ('album-9-photo-4','album-9','https://picsum.photos/seed/album9photo4/800/600','Ảnh 4','Ảnh hoạt động 4',800,600),
  ('album-9-photo-5','album-9','https://picsum.photos/seed/album9photo5/800/600','Ảnh 5','Ảnh hoạt động 5',800,600),
  ('album-9-photo-6','album-9','https://picsum.photos/seed/album9photo6/800/600','Ảnh 6','Ảnh hoạt động 6',800,600),
  ('album-9-photo-7','album-9','https://picsum.photos/seed/album9photo7/800/600','Ảnh 7','Ảnh hoạt động 7',800,600),
  ('album-9-photo-8','album-9','https://picsum.photos/seed/album9photo8/800/600','Ảnh 8','Ảnh hoạt động 8',800,600),
  ('album-9-photo-9','album-9','https://picsum.photos/seed/album9photo9/800/600','Ảnh 9','Ảnh hoạt động 9',800,600),
  ('album-9-photo-10','album-9','https://picsum.photos/seed/album9photo10/800/600','Ảnh 10','Ảnh hoạt động 10',800,600),
  ('album-9-photo-11','album-9','https://picsum.photos/seed/album9photo11/800/600','Ảnh 11','Ảnh hoạt động 11',800,600),
  ('album-9-photo-12','album-9','https://picsum.photos/seed/album9photo12/800/600','Ảnh 12','Ảnh hoạt động 12',800,600),
  ('album-9-photo-13','album-9','https://picsum.photos/seed/album9photo13/800/600','Ảnh 13','Ảnh hoạt động 13',800,600),
  ('album-9-photo-14','album-9','https://picsum.photos/seed/album9photo14/800/600','Ảnh 14','Ảnh hoạt động 14',800,600),
  ('album-9-photo-15','album-9','https://picsum.photos/seed/album9photo15/800/600','Ảnh 15','Ảnh hoạt động 15',800,600),
  ('album-9-photo-16','album-9','https://picsum.photos/seed/album9photo16/800/600','Ảnh 16','Ảnh hoạt động 16',800,600);

-- ============================================================
-- Educational Programs
-- ============================================================
INSERT INTO educational_programs (id, title, slug, short_description, full_description, cover_image, icon_emoji, age_group, order_index, long_description, weekly_schedule)
VALUES
  ('prog-1', 'Phát Triển Ngôn Ngữ', 'phat-trien-ngon-ngu', 'Chương trình giáo dục toàn diện.', 'Chương trình phát triển ngôn ngữ toàn diện cho trẻ.', 'https://picsum.photos/seed/prog1/600/400', '📚', 'ALL', 1, 'Chương trình phát triển kỹ năng ngôn ngữ và giao tiếp cho trẻ mầm non.', '3 buổi/tuần'),
  ('prog-2', 'Âm Nhạc & Nghệ Thuật', 'am-nhac-nghe-thuat', 'Chương trình giáo dục toàn diện.', 'Chương trình âm nhạc và nghệ thuật sáng tạo.', 'https://picsum.photos/seed/prog2/600/400', '🎨', 'ALL', 2, 'Chương trình phát triển năng khiếu âm nhạc và nghệ thuật cho trẻ.', '3 buổi/tuần'),
  ('prog-3', 'Thể Chất & Vận Động', 'the-chat-van-dong', 'Chương trình giáo dục toàn diện.', 'Chương trình thể chất và vận động cho trẻ.', 'https://picsum.photos/seed/prog3/600/400', '⚽', 'ALL', 3, 'Chương trình phát triển thể chất và vận động toàn diện cho trẻ mầm non.', '3 buổi/tuần'),
  ('prog-4', 'Toán & Tư Duy Logic', 'toan-tu-duy-logic', 'Chương trình giáo dục toàn diện.', 'Chương trình toán và tư duy logic cho trẻ 4 tuổi.', 'https://picsum.photos/seed/prog4/600/400', '🔢', 'FOUR_TUOI', 4, 'Chương trình phát triển tư duy toán học và logic cho trẻ lớp Chồi.', '3 buổi/tuần'),
  ('prog-5', 'Kỹ Năng Sống', 'ky-nang-song', 'Chương trình giáo dục toàn diện.', 'Chương trình kỹ năng sống cho trẻ 5 tuổi.', 'https://picsum.photos/seed/prog5/600/400', '🌟', 'FIVE_TUOI', 5, 'Chương trình trang bị kỹ năng sống quan trọng cho trẻ lớp Lá.', '3 buổi/tuần'),
  ('prog-6', 'Tiếng Anh Cho Bé', 'tieng-anh-cho-be', 'Chương trình giáo dục toàn diện.', 'Chương trình tiếng Anh cho trẻ 5 tuổi.', 'https://picsum.photos/seed/prog6/600/400', '🔤', 'FIVE_TUOI', 6, 'Chương trình tiếng Anh vui học dành cho trẻ lớp Lá.', '3 buổi/tuần');

INSERT INTO program_outcomes (program_id, outcome) VALUES
  ('prog-1', 'Phát triển kỹ năng'), ('prog-1', 'Tăng cường tư duy'),
  ('prog-2', 'Phát triển kỹ năng'), ('prog-2', 'Tăng cường tư duy'),
  ('prog-3', 'Phát triển kỹ năng'), ('prog-3', 'Tăng cường tư duy'),
  ('prog-4', 'Phát triển kỹ năng'), ('prog-4', 'Tăng cường tư duy'),
  ('prog-5', 'Phát triển kỹ năng'), ('prog-5', 'Tăng cường tư duy'),
  ('prog-6', 'Phát triển kỹ năng'), ('prog-6', 'Tăng cường tư duy');

INSERT INTO program_featured_images (program_id, image_url) VALUES
  ('prog-1', 'https://picsum.photos/seed/prog1feat1/600/400'),
  ('prog-1', 'https://picsum.photos/seed/prog1feat2/600/400'),
  ('prog-2', 'https://picsum.photos/seed/prog2feat1/600/400'),
  ('prog-2', 'https://picsum.photos/seed/prog2feat2/600/400'),
  ('prog-3', 'https://picsum.photos/seed/prog3feat1/600/400'),
  ('prog-3', 'https://picsum.photos/seed/prog3feat2/600/400'),
  ('prog-4', 'https://picsum.photos/seed/prog4feat1/600/400'),
  ('prog-4', 'https://picsum.photos/seed/prog4feat2/600/400'),
  ('prog-5', 'https://picsum.photos/seed/prog5feat1/600/400'),
  ('prog-5', 'https://picsum.photos/seed/prog5feat2/600/400'),
  ('prog-6', 'https://picsum.photos/seed/prog6feat1/600/400'),
  ('prog-6', 'https://picsum.photos/seed/prog6feat2/600/400');

INSERT INTO program_albums (program_id, album_id) VALUES
  ('prog-1', 'album-1'), ('prog-1', 'album-4'),
  ('prog-2', 'album-2'), ('prog-2', 'album-5'),
  ('prog-3', 'album-3'),
  ('prog-4', 'album-6'),
  ('prog-5', 'album-7'),
  ('prog-6', 'album-8');

-- ============================================================
-- Learning Materials
-- ============================================================
INSERT INTO learning_materials (id, title, type, icon, category, description, file_url, size, updated_at, age_group, created_at)
VALUES
  ('mat-1', 'Thực đơn dinh dưỡng tháng 9/2025', 'PDF', '🍽️', 'THUC_DON', 'Tài liệu học tập.', '/files/sample.pdf', '1.2 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00'),
  ('mat-2', 'Lịch học kỳ I năm 2025–2026', 'PDF', '📅', 'LICH_HOC', 'Tài liệu học tập.', '/files/sample.pdf', '0.8 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00'),
  ('mat-3', 'Sách bài tập lớp Mầm – Học kỳ I', 'PDF', '📖', 'SACH_BAI_TAP', 'Tài liệu học tập.', '/files/sample.pdf', '5.2 MB', '2025-09-01T00:00:00', 'THREE_TUOI', '2025-09-01T00:00:00'),
  ('mat-4', 'Sách bài tập lớp Chồi – Học kỳ I', 'PDF', '📖', 'SACH_BAI_TAP', 'Tài liệu học tập.', '/files/sample.pdf', '5.4 MB', '2025-09-01T00:00:00', 'FOUR_TUOI', '2025-09-01T00:00:00'),
  ('mat-5', 'Sách bài tập lớp Lá – Học kỳ I', 'PDF', '📖', 'SACH_BAI_TAP', 'Tài liệu học tập.', '/files/sample.pdf', '5.6 MB', '2025-09-01T00:00:00', 'FIVE_TUOI', '2025-09-01T00:00:00'),
  ('mat-6', 'Danh sách bài hát thiếu nhi HK I', 'PDF', '🎵', 'AM_NHAC', 'Tài liệu học tập.', '/files/sample.pdf', '2.1 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00'),
  ('mat-7', 'Hướng dẫn chuẩn bị đồ dùng đi học', 'PDF', '📋', 'HUONG_DAN', 'Tài liệu học tập.', '/files/sample.pdf', '1.5 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00'),
  ('mat-8', 'Chương trình thể dục buổi sáng', 'PDF', '⚽', 'THE_CHAT', 'Tài liệu học tập.', '/files/sample.pdf', '3.2 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00'),
  ('mat-9', 'Bài tập tô màu và vẽ cho bé', 'PDF', '🎨', 'NGHE_THUAT', 'Tài liệu học tập.', '/files/sample.pdf', '4.5 MB', '2025-09-01T00:00:00', 'ALL', '2025-09-01T00:00:00');

-- ============================================================
-- Facilities
-- ============================================================
INSERT INTO facilities (id, name, description, icon_emoji)
VALUES
  ('facility-1', 'Phòng Học', 'Cơ sở vật chất hiện đại.', '🏫'),
  ('facility-2', 'Sân Chơi Ngoài Trời', 'Cơ sở vật chất hiện đại.', '🌳'),
  ('facility-3', 'Phòng Thư Viện', 'Cơ sở vật chất hiện đại.', '📖'),
  ('facility-4', 'Nhà Bếp & Phòng Ăn', 'Cơ sở vật chất hiện đại.', '🍽️'),
  ('facility-5', 'Phòng Y Tế', 'Cơ sở vật chất hiện đại.', '🏥'),
  ('facility-6', 'Phòng Âm Nhạc', 'Cơ sở vật chất hiện đại.', '🎵');

-- Facility images (4 photos each for facility-1, facility-2; 3 for facility-3, facility-4, facility-6; 2 for facility-5)
INSERT INTO facility_images (id, facility_id, src, alt, caption, width, height) VALUES
  ('facility-1-photo-1','facility-1','https://picsum.photos/seed/facility1photo1/800/600','Ảnh 1','Phòng học 1',800,600),
  ('facility-1-photo-2','facility-1','https://picsum.photos/seed/facility1photo2/800/600','Ảnh 2','Phòng học 2',800,600),
  ('facility-1-photo-3','facility-1','https://picsum.photos/seed/facility1photo3/800/600','Ảnh 3','Phòng học 3',800,600),
  ('facility-1-photo-4','facility-1','https://picsum.photos/seed/facility1photo4/800/600','Ảnh 4','Phòng học 4',800,600),
  ('facility-2-photo-1','facility-2','https://picsum.photos/seed/facility2photo1/800/600','Ảnh 1','Sân chơi 1',800,600),
  ('facility-2-photo-2','facility-2','https://picsum.photos/seed/facility2photo2/800/600','Ảnh 2','Sân chơi 2',800,600),
  ('facility-2-photo-3','facility-2','https://picsum.photos/seed/facility2photo3/800/600','Ảnh 3','Sân chơi 3',800,600),
  ('facility-2-photo-4','facility-2','https://picsum.photos/seed/facility2photo4/800/600','Ảnh 4','Sân chơi 4',800,600),
  ('facility-3-photo-1','facility-3','https://picsum.photos/seed/facility3photo1/800/600','Ảnh 1','Thư viện 1',800,600),
  ('facility-3-photo-2','facility-3','https://picsum.photos/seed/facility3photo2/800/600','Ảnh 2','Thư viện 2',800,600),
  ('facility-3-photo-3','facility-3','https://picsum.photos/seed/facility3photo3/800/600','Ảnh 3','Thư viện 3',800,600),
  ('facility-4-photo-1','facility-4','https://picsum.photos/seed/facility4photo1/800/600','Ảnh 1','Nhà bếp 1',800,600),
  ('facility-4-photo-2','facility-4','https://picsum.photos/seed/facility4photo2/800/600','Ảnh 2','Nhà bếp 2',800,600),
  ('facility-4-photo-3','facility-4','https://picsum.photos/seed/facility4photo3/800/600','Ảnh 3','Nhà bếp 3',800,600),
  ('facility-5-photo-1','facility-5','https://picsum.photos/seed/facility5photo1/800/600','Ảnh 1','Phòng y tế 1',800,600),
  ('facility-5-photo-2','facility-5','https://picsum.photos/seed/facility5photo2/800/600','Ảnh 2','Phòng y tế 2',800,600),
  ('facility-6-photo-1','facility-6','https://picsum.photos/seed/facility6photo1/800/600','Ảnh 1','Phòng âm nhạc 1',800,600),
  ('facility-6-photo-2','facility-6','https://picsum.photos/seed/facility6photo2/800/600','Ảnh 2','Phòng âm nhạc 2',800,600),
  ('facility-6-photo-3','facility-6','https://picsum.photos/seed/facility6photo3/800/600','Ảnh 3','Phòng âm nhạc 3',800,600);

-- ============================================================
-- Contact Info
-- ============================================================
INSERT INTO contact_info (id, school_name, address, district, city, email, google_maps_embed_url)
VALUES (
  'contact-1',
  'Trường Mầm Non Ánh Dương',
  '123 Đường Nguyễn Văn Cừ',
  'Quận 5',
  'TP. Hồ Chí Minh',
  'contact@mannonanhduong.edu.vn',
  'https://www.google.com/maps/embed?pb=!1m18!1m12...'
);

INSERT INTO contact_phones (contact_id, phone) VALUES
  ('contact-1', '028 3855 1234'),
  ('contact-1', '0909 123 456');

INSERT INTO working_hours (contact_id, label, hours) VALUES
  ('contact-1', 'Thứ Hai – Thứ Sáu', '6:30 – 17:30'),
  ('contact-1', 'Thứ Bảy', '7:00 – 11:30'),
  ('contact-1', 'Chủ Nhật', 'Nghỉ');

INSERT INTO social_links (contact_id, platform, url, handle) VALUES
  ('contact-1', 'FACEBOOK', 'https://facebook.com/mannonanhduong', '@mannonanhduong'),
  ('contact-1', 'ZALO', 'https://zalo.me/0909123456', '0909 123 456'),
  ('contact-1', 'YOUTUBE', 'https://youtube.com/@mannonanhduong', '@mannonanhduong');
