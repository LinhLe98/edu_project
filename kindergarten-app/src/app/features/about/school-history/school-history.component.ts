import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-school-history',
  standalone: true,
  imports: [NgFor, SectionHeadingComponent],
  templateUrl: './school-history.component.html',
  styleUrl: './school-history.component.css',
})
export class SchoolHistoryComponent {
  timeline = [
    { year: '2010', title: 'Thành lập trường', desc: 'Trường Mầm Non Ánh Dương khai giảng lớp học đầu tiên với 45 học sinh và 5 giáo viên.' },
    { year: '2013', title: 'Mở rộng quy mô', desc: 'Xây dựng thêm 3 phòng học mới và sân chơi ngoài trời đạt chuẩn quốc tế.' },
    { year: '2016', title: 'Đạt chuẩn Quốc gia', desc: 'Trường được công nhận đạt chuẩn chất lượng giáo dục mầm non cấp Quốc gia.' },
    { year: '2019', title: 'Chương trình song ngữ', desc: 'Triển khai chương trình tiếng Anh tích hợp cho lớp Lá với giáo viên bản ngữ.' },
    { year: '2022', title: 'Nâng cấp cơ sở vật chất', desc: 'Lắp đặt bảng tương tác và hệ thống học liệu số hiện đại cho tất cả các lớp.' },
    { year: '2025', title: 'Kỷ niệm 15 năm', desc: 'Hơn 350 học sinh, 25 giáo viên và hàng nghìn cựu học sinh thành công trên toàn quốc.' },
  ];
}
