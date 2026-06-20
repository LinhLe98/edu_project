import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-quick-stats',
  standalone: true,
  imports: [NgFor],
  templateUrl: './quick-stats.component.html',
  styleUrl: './quick-stats.component.css',
})
export class QuickStatsComponent {
  stats = [
    { value: '15+', label: 'Năm thành lập' },
    { value: '350+', label: 'Học sinh' },
    { value: '25+', label: 'Giáo viên' },
    { value: '6', label: 'Phòng học hiện đại' },
  ];
}
