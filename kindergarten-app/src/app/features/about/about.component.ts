import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ManagementBoardComponent } from './management-board/management-board.component';
import { TeacherGroupsComponent } from './teacher-groups/teacher-groups.component';
import { FacilitiesSectionComponent } from './facilities-section/facilities-section.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    ManagementBoardComponent,
    TeacherGroupsComponent,
    FacilitiesSectionComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  timeline = [
    { year: '2010', title: 'Thành lập trường', desc: 'Khai giảng lớp học đầu tiên với 45 học sinh và 5 giáo viên.' },
    { year: '2013', title: 'Mở rộng quy mô', desc: 'Xây thêm 3 phòng học và sân chơi đạt chuẩn quốc tế.' },
    { year: '2016', title: 'Đạt chuẩn Quốc gia', desc: 'Được công nhận đạt chuẩn chất lượng giáo dục mầm non cấp Quốc gia.' },
    { year: '2019', title: 'Chương trình song ngữ', desc: 'Triển khai tiếng Anh tích hợp với giáo viên bản ngữ.' },
    { year: '2022', title: 'Nâng cấp cơ sở vật chất', desc: 'Bảng tương tác và hệ thống học liệu số hiện đại toàn trường.' },
    { year: '2025', title: 'Kỷ niệm 15 năm', desc: 'Hơn 350 học sinh, 25 giáo viên, hàng nghìn cựu học sinh thành công.' },
  ];
}
