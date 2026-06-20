import { NewsArticle } from '../models';

export const NEWS_DATA: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Lễ Khai Giảng Năm Học 2025–2026: Ngày Hội Tựu Trường Của 320 Bé Ánh Dương',
    slug: 'khai-giang-nam-hoc-moi-2025-2026',
    excerpt: 'Trường Mầm Non Ánh Dương trân trọng kính mời quý phụ huynh và các bé tham dự lễ khai giảng năm học mới 2025–2026 vào ngày 5 tháng 9 năm 2025 tại sân trường chính.',
    content: `<p>Lễ khai giảng năm học 2025–2026 của Trường Mầm Non Ánh Dương sẽ được tổ chức long trọng vào sáng ngày 5 tháng 9 năm 2025, bắt đầu từ 7h30 tại sân trường chính. Đây là ngày hội quan trọng đánh dấu bước khởi đầu của một năm học đầy hứa hẹn với 320 học sinh gồm cả học sinh cũ và học sinh mới.</p>
<p>Chương trình khai giảng năm nay sẽ bao gồm nhiều hoạt động đặc sắc: màn biểu diễn văn nghệ chào mừng do các bé lớp Lá năm ngoái lên biểu diễn, phát biểu của Hiệu Trưởng Nguyễn Thị Hương về định hướng giáo dục năm học mới, và đặc biệt là nghi thức "Gõ trống khai trường" mang tính truyền thống được nhà trường duy trì 10 năm qua. Ngoài ra, các bé sẽ được nhận quà khai trường là bộ dụng cụ học tập mang thương hiệu Ánh Dương.</p>
<p>Nhà trường thông báo phụ huynh vui lòng đưa các bé đến trường trước 7h15 để ổn định chỗ ngồi và chuẩn bị trang phục đồng phục trường. Khuôn viên trường sẽ được trang trí rực rỡ với hoa và bong bóng theo chủ đề "Ngàn Tia Nắng Mới". Ban Giám Hiệu rất mong được gặp gỡ và chào đón toàn thể gia đình Ánh Dương trong ngày đặc biệt này.</p>`,
    coverImage: 'https://picsum.photos/seed/news-1/800/500',
    publishedAt: '2025-08-20T08:00:00Z',
    category: 'su-kien',
    tags: ['khai-giang', 'nam-hoc-moi'],
    featured: true,
  },
  {
    id: 'news-2',
    title: 'Thông Báo Tuyển Sinh Năm Học 2025–2026: Ưu Tiên Hồ Sơ Nộp Trước Ngày 31/7',
    slug: 'thong-bao-tuyen-sinh-2025-2026',
    excerpt: 'Trường Mầm Non Ánh Dương thông báo tuyển sinh lớp Mầm (3 tuổi), lớp Chồi (4 tuổi) và lớp Lá (5 tuổi) cho năm học 2025–2026 với chính sách ưu đãi đặc biệt cho phụ huynh đăng ký sớm.',
    content: `<p>Trường Mầm Non Ánh Dương chính thức mở đăng ký tuyển sinh cho năm học 2025–2026 từ ngày 15/7/2025 đến hết ngày 20/8/2025. Nhà trường tuyển sinh 3 khối lớp: Lớp Mầm dành cho trẻ sinh năm 2022 (3 tuổi), Lớp Chồi dành cho trẻ sinh năm 2021 (4 tuổi) và Lớp Lá dành cho trẻ sinh năm 2020 (5 tuổi). Tổng chỉ tiêu tuyển sinh là 120 học sinh, mỗi lớp tối đa 20 bé để đảm bảo chất lượng chăm sóc và giảng dạy.</p>
<p>Hồ sơ đăng ký gồm: Đơn xin nhập học (theo mẫu của trường), bản sao giấy khai sinh của trẻ, bản sao giấy tờ tùy thân của phụ huynh và 4 ảnh 3x4 của trẻ. Phụ huynh có thể nộp hồ sơ trực tiếp tại văn phòng nhà trường vào giờ hành chính từ thứ Hai đến thứ Sáu, hoặc gửi hồ sơ điện tử qua email tuyensinh@anhduong.edu.vn. Ưu tiên nhận hồ sơ của anh/chị em học sinh đang theo học tại trường và con em cán bộ giáo viên.</p>
<p>Đặc biệt, phụ huynh đăng ký và nộp đủ học phí trước ngày 31/7/2025 sẽ được hưởng ưu đãi giảm 10% học phí học kỳ I và nhận bộ đồng phục trị giá 350.000 đồng. Để được tư vấn chi tiết về chương trình học, cơ sở vật chất và chính sách học phí, phụ huynh vui lòng liên hệ Chị Yến tại số 028-3456-7890 hoặc đến tham quan trường vào các buổi chiều từ thứ Hai đến thứ Sáu.</p>`,
    coverImage: 'https://picsum.photos/seed/news-2/800/500',
    publishedAt: '2025-07-15T08:00:00Z',
    category: 'thong-bao',
    tags: ['tuyen-sinh', 'thong-bao'],
    featured: true,
  },
  {
    id: 'news-3',
    title: 'Đêm Hội Trung Thu 2025 Rực Rỡ: 300 Chiếc Đèn Lồng Thắp Sáng Sân Trường',
    slug: 'ngay-hoi-trung-thu-2025',
    excerpt: 'Đêm rước đèn lung linh với 300 chiếc đèn lồng tự tay các bé làm, mâm cỗ trung thu đầy màu sắc và màn múa lân hoành tráng – đêm hội Trung Thu 2025 là kỷ niệm không thể nào quên!',
    content: `<p>Đêm hội Trung Thu năm 2025 tại Trường Mầm Non Ánh Dương đã diễn ra trong không khí rực rỡ và đầy xúc cảm vào tối ngày 6/9/2025. Với chủ đề "Ánh Trăng Kỳ Diệu", sân trường được trang trí lung linh với hàng trăm chiếc đèn lồng đủ màu sắc do chính tay các bé tự làm trong các buổi học thủ công trước đó. Hơn 400 trẻ em và phụ huynh đã cùng nhau tham gia vào đêm hội đáng nhớ này.</p>
<p>Chương trình mở đầu bằng màn trình diễn múa lân sôi động do đội lân chuyên nghiệp biểu diễn, khiến các bé hò reo phấn khích. Tiếp theo là lễ rước đèn vòng quanh sân trường với 300 chiếc đèn lồng – mỗi bé tự tay cầm một chiếc đèn do mình tự làm. Hình ảnh những đôi mắt trẻ thơ lấp lánh dưới ánh đèn lồng đã để lại ấn tượng sâu đậm trong lòng tất cả phụ huynh có mặt. Sau lễ rước đèn, các bé cùng phá cỗ trung thu với bánh nướng, bánh dẻo, trái cây và những tiết mục văn nghệ dân gian do chính các bé biểu diễn.</p>
<p>Đặc biệt năm nay, nhà trường tổ chức cuộc thi "Trang trí đèn lồng sáng tạo nhất" với nhiều phần quà hấp dẫn. Ban giám khảo là các cô giáo và phụ huynh đã rất khó khăn trong việc chọn ra 10 tác phẩm đẹp nhất từ hàng trăm chiếc đèn lồng của các bé. Đây là hoạt động nằm trong khuôn khổ Tháng Văn Hóa Dân Gian của nhà trường, nhằm giúp trẻ hiểu và yêu quý các nét văn hóa truyền thống của người Việt.</p>`,
    coverImage: 'https://picsum.photos/seed/news-3/800/500',
    publishedAt: '2025-09-10T08:00:00Z',
    category: 'hoat-dong',
    tags: ['trung-thu', 'le-hoi'],
    featured: true,
  },
  {
    id: 'news-4',
    title: 'Chuyến Tham Quan Vườn Thú Sài Gòn 2025: Các Bé Lớp Lá Khám Phá Thế Giới Động Vật',
    slug: 'tham-quan-vuon-thu-sai-gon-2025',
    excerpt: 'Các bé lớp Lá đã có một ngày tham quan thú vị và bổ ích tại Vườn thú Sài Gòn, được gặp gỡ hơn 50 loài động vật và học nhiều điều thú vị về thiên nhiên hoang dã.',
    content: `<p>Ngày 5 tháng 10 năm 2025 là ngày đáng nhớ của các bé lớp Lá Trường Mầm Non Ánh Dương khi được đến tham quan Vườn thú Sài Gòn (Thảo Cầm Viên). Đây là hoạt động ngoại khóa nằm trong chủ đề "Thế Giới Động Vật" của chương trình học học kỳ I. Chuyến đi có sự tham gia của 60 bé lớp Lá 1, Lá 2 và Lá 3 cùng với các cô giáo và 15 phụ huynh tình nguyện hỗ trợ.</p>
<p>Trong suốt buổi tham quan, các bé được hướng dẫn viên của vườn thú dẫn đi khắp các khu vực và giới thiệu về hơn 50 loài động vật. Những khoảnh khắc được các bé yêu thích nhất là khi xem màn biểu diễn của hà mã và đại bàng, được chạm tay vào con rùa khổng lồ 100 tuổi và đặc biệt là được cho voi ăn dưới sự giám sát của nhân viên vườn thú. Các cô giáo đã chuẩn bị sẵn phiếu học tập để các bé điền thông tin về các con vật mà mình gặp, biến chuyến tham quan thành bài học thực tế sinh động.</p>
<p>Sau chuyến tham quan, về đến lớp, các bé được yêu cầu vẽ tranh và kể lại về con vật mà mình ấn tượng nhất trong ngày. Những tác phẩm này đã được trưng bày tại hành lang lớp học, tạo nên một "triển lãm thế giới động vật" nhỏ xinh do chính tay các bé thực hiện. Đây là minh chứng rõ nét cho phương pháp giáo dục "học qua trải nghiệm thực tế" mà nhà trường theo đuổi.</p>`,
    coverImage: 'https://picsum.photos/seed/news-4/800/500',
    publishedAt: '2025-10-05T08:00:00Z',
    category: 'hoat-dong',
    tags: ['tham-quan', 'lop-la'],
    featured: false,
  },
  {
    id: 'news-5',
    title: '"Bé Khỏe – Bé Ngoan" Học Kỳ I: 97% Các Bé Đạt Tiêu Chuẩn Phát Triển Toàn Diện',
    slug: 'chuong-trinh-be-khoe-be-ngoan',
    excerpt: 'Kết quả kiểm tra sức khỏe và đánh giá nề nếp học tập định kỳ học kỳ I năm học 2025–2026 cho thấy sự phát triển ấn tượng của trẻ tại Trường Mầm Non Ánh Dương.',
    content: `<p>Nhà trường vui mừng thông báo kết quả chương trình "Bé Khỏe – Bé Ngoan" học kỳ I năm học 2025–2026: có đến 97% các bé đạt tiêu chuẩn sức khỏe tốt và có nề nếp học tập đúng độ tuổi. Đây là kết quả của sự phối hợp chặt chẽ giữa đội ngũ giáo viên, y tế học đường và gia đình trong suốt 4 tháng qua. Tổng số trẻ được đánh giá là 318 bé thuộc tất cả các lớp Mầm, Chồi và Lá.</p>
<p>Theo báo cáo của bộ phận y tế học đường, 94% các bé đạt chuẩn chiều cao và cân nặng theo bảng phát triển của Bộ Y tế, tăng 3% so với cùng kỳ năm ngoái. Đặc biệt, tỷ lệ bé bị suy dinh dưỡng thấp cân giảm xuống còn 2.1%, thấp nhất trong lịch sử 10 năm của trường – đây là thành quả đáng tự hào của chương trình dinh dưỡng học đường được cải tiến từ năm học này. Về nề nếp và hành vi, 98% bé biết tự phục vụ bản thân trong bữa ăn và giấc ngủ, 95% biết nói "cảm ơn" và "xin lỗi" đúng hoàn cảnh.</p>
<p>Hiệu Trưởng Nguyễn Thị Hương cho biết: "Những con số này không chỉ phản ánh chất lượng chăm sóc và giáo dục tại trường mà còn thể hiện sự quan tâm và đồng hành của phụ huynh trong hành trình phát triển của con. Chúng tôi sẽ tiếp tục duy trì và nâng cao các chương trình dinh dưỡng, thể chất và giáo dục kỹ năng để học kỳ II đạt kết quả tốt hơn nữa." Nhà trường sẽ gửi báo cáo sức khỏe cá nhân của từng bé đến phụ huynh vào cuối tuần này.</p>`,
    coverImage: 'https://picsum.photos/seed/news-5/800/500',
    publishedAt: '2025-11-20T08:00:00Z',
    category: 'tin-tuc',
    tags: ['suc-khoe', 'hoc-ky-i'],
    featured: false,
  },
  {
    id: 'news-6',
    title: 'Giáng Sinh 2025 Ấm Áp: Ông Già Noel Đặc Biệt Tặng Quà Cho 320 Bé Ánh Dương',
    slug: 'le-giang-sinh-2025',
    excerpt: 'Bữa tiệc Giáng Sinh ấm áp với màn biểu diễn văn nghệ đặc sắc, nhận quà từ ông già Noel bí ẩn và bữa tiệc tối Giáng Sinh đầu tiên trong lịch sử nhà trường đã để lại kỷ niệm không thể quên.',
    content: `<p>Ngày 22 tháng 12 năm 2025, Trường Mầm Non Ánh Dương đã tổ chức buổi lễ Giáng Sinh 2025 mang chủ đề "Mùa Đông Kỳ Diệu" – một trong những sự kiện được mong đợi nhất trong năm của cả trẻ lẫn phụ huynh. Sân trường được biến thành một "làng tuyết" thu nhỏ với cây thông Noel khổng lồ cao 4 mét, hàng trăm trang trí lung linh và tuyết nhân tạo rải đều trên mặt sân. Hơn 500 người gồm toàn bộ học sinh, giáo viên và phụ huynh đã có mặt để cùng đón mừng ngày lễ đặc biệt.</p>
<p>Chương trình văn nghệ Giáng Sinh năm nay đặc biệt ấn tượng với 15 tiết mục do chính các bé biểu diễn, từ múa ballet chuột túi đến tiểu phẩm kịch "Giáng Sinh Kỳ Diệu" với sự tham gia của 30 bé lớp Lá. Màn hợp xướng bài "Jingle Bells" và "We Wish You a Merry Christmas" bằng tiếng Anh của 60 bé là khoảnh khắc được nhiều phụ huynh quay lại và chia sẻ rộng rãi trên mạng xã hội. Đỉnh điểm của chương trình là sự xuất hiện bất ngờ của ông già Noel với chiếc xe tuần lộc và túi quà khổng lồ, tặng mỗi bé một phần quà đặc biệt được gói cẩn thận.</p>
<p>Năm nay lần đầu tiên nhà trường tổ chức "Bữa Tiệc Giáng Sinh" với menu đặc biệt gồm gà quay, salad rau củ, bánh Yule log và nước ép trái cây tươi. Đây là sáng kiến của Ban Giám Hiệu nhằm tạo thêm kỷ niệm ấm áp cho các bé và gia đình. Sự kiện kết thúc lúc 20h30 trong tiếng hát vang và nụ cười hạnh phúc của toàn thể gia đình Ánh Dương – một mùa Giáng Sinh không thể nào quên.</p>`,
    coverImage: 'https://picsum.photos/seed/news-6/800/500',
    publishedAt: '2025-12-22T08:00:00Z',
    category: 'su-kien',
    tags: ['giang-sinh', 'le-hoi'],
    featured: false,
  },
  {
    id: 'news-7',
    title: 'Thông Báo Lịch Nghỉ Tết Nguyên Đán Bính Ngọ 2026 và Ngày Tựu Trường',
    slug: 'lich-nghi-tet-nguyen-dan-2026',
    excerpt: 'Trường Mầm Non Ánh Dương thông báo lịch nghỉ Tết Nguyên Đán Bính Ngọ 2026 chính thức và lịch tựu trường học kỳ II, đề nghị phụ huynh sắp xếp kế hoạch cho gia đình.',
    content: `<p>Căn cứ thông báo lịch nghỉ Tết của Sở Giáo Dục và Đào Tạo TP.HCM, Trường Mầm Non Ánh Dương thông báo: Học sinh toàn trường sẽ được nghỉ Tết Nguyên Đán Bính Ngọ 2026 từ ngày 25 tháng 1 năm 2026 (thứ Sáu) đến hết ngày 9 tháng 2 năm 2026 (thứ Hai), tức nghỉ 16 ngày (bao gồm thứ Bảy, Chủ Nhật). Các bé sẽ chính thức trở lại trường vào ngày 10 tháng 2 năm 2026 (thứ Ba – mùng 13 tháng Giêng Âm Lịch).</p>
<p>Trong thời gian nghỉ Tết, nhà trường vẫn duy trì đường dây liên lạc khẩn cấp qua số 028-3456-7890 trong trường hợp phụ huynh cần hỗ trợ. Đối với trẻ có nhu cầu gửi trong dịp Tết do gia đình bận công việc, nhà trường có thể sắp xếp lớp trông giữ từ ngày 27/1 đến 1/2/2026 với phụ phí theo thỏa thuận – phụ huynh vui lòng đăng ký trước ngày 20/1/2026 qua văn phòng nhà trường.</p>
<p>Nhân dịp Tết Nguyên Đán Bính Ngọ 2026, Ban Giám Hiệu và toàn thể cán bộ giáo viên nhân viên Trường Mầm Non Ánh Dương kính chúc toàn thể phụ huynh và gia đình một năm mới an khang, thịnh vượng và vạn sự như ý. Chúc các bé học sinh của trường luôn mạnh khỏe, vui vẻ và ngoan ngoãn để bước sang một năm học mới tràn đầy niềm vui và khám phá!</p>`,
    coverImage: 'https://picsum.photos/seed/news-7/800/500',
    publishedAt: '2026-01-10T08:00:00Z',
    category: 'thong-bao',
    tags: ['tet', 'lich-nghi'],
    featured: false,
  },
  {
    id: 'news-8',
    title: 'Lễ Tốt Nghiệp Mầm Non 2025: 48 Bé Lớp Lá Đội Mũ Cử Nhân Nhí, Sẵn Sàng Vào Lớp 1',
    slug: 'tong-ket-nam-hoc-2024-2025',
    excerpt: 'Buổi lễ trang trọng và đầy xúc động vinh danh 48 bé lớp Lá hoàn thành chương trình mầm non năm học 2024–2025, chính thức khép lại hành trình 3 năm tươi đẹp tại Ánh Dương.',
    content: `<p>Ngày 30 tháng 5 năm 2025, Trường Mầm Non Ánh Dương đã tổ chức Lễ Tốt Nghiệp và Tổng Kết Năm Học 2024–2025 trong không khí vừa trang trọng vừa đầy cảm xúc. 48 bé lớp Lá năm nay đã chính thức nhận "bằng tốt nghiệp mầm non" và chiếc mũ cử nhân nhí đáng yêu từ tay Hiệu Trưởng Nguyễn Thị Hương trước sự chứng kiến của toàn thể gia đình và đội ngũ giáo viên nhà trường. Đây là buổi lễ được chuẩn bị công phu nhất từ trước đến nay của Ánh Dương.</p>
<p>Chương trình lễ tốt nghiệp bắt đầu bằng màn trình diễn "Hành Trình 3 Năm" – video montage ghi lại những khoảnh khắc đáng nhớ của từng bé từ ngày đầu đến trường lớp Mầm đến ngày hôm nay, khiến nhiều bậc phụ huynh không cầm được nước mắt. Tiếp theo là màn biểu diễn văn nghệ đặc biệt do các bé lớp Lá 3 lớp tập luyện trong suốt 2 tháng, bao gồm múa, hát và tiểu phẩm hài hước về cuộc sống trường mầm non. Mỗi bé được gọi tên lên nhận bằng và chụp ảnh kỷ niệm với cô giáo chủ nhiệm của mình.</p>
<p>Hiệu Trưởng Nguyễn Thị Hương phát biểu trong buổi lễ: "Hôm nay không phải là ngày chia tay mà là ngày bắt đầu của một chương mới trong cuộc đời các con. Những gì các con học được tại Ánh Dương – sự tự tin, tình yêu thương, niềm vui học tập – sẽ là hành trang quý giá nhất theo các con suốt cuộc đời." Sau buổi lễ, nhà trường tổ chức tiệc liên hoan nhỏ với bánh kem và đồ ăn nhẹ, tạo cơ hội để các gia đình và giáo viên giao lưu lần cuối trước khi các bé bước sang trang mới.</p>`,
    coverImage: 'https://picsum.photos/seed/news-8/800/500',
    publishedAt: '2025-05-30T08:00:00Z',
    category: 'su-kien',
    tags: ['tot-nghiep', 'lop-la', 'cuoi-nam'],
    featured: false,
  },
];
