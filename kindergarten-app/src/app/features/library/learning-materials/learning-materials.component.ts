import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { MaterialsService } from '../../../core/services/materials.service';
import { LearningMaterial } from '../../../core/models';
import { SectionHeadingComponent } from '../../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-learning-materials',
  standalone: true,
  imports: [NgFor, SectionHeadingComponent],
  templateUrl: './learning-materials.component.html',
  styleUrl: './learning-materials.component.css',
})
export class LearningMaterialsComponent {
  private materialsService = inject(MaterialsService);
  materials = toSignal(this.materialsService.getAll(), { initialValue: [] });

  async downloadMaterial(material: LearningMaterial) {
    try {
      const response = await fetch(material.fileUrl);
      if (!response.ok) throw new Error('fetch failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${material.title}.${material.type.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(material.fileUrl, '_blank');
    }
  }

  viewMaterial(material: LearningMaterial) {
    window.open(material.fileUrl, '_blank');
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
}
