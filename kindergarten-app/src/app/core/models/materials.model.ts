export type MaterialCategory = 'thuc-don' | 'lich-hoc' | 'sach-bai-tap' | 'am-nhac' | 'huong-dan' | 'the-chat' | 'nghe-thuat';
export type MaterialType = 'PDF' | 'WORD' | 'EXCEL' | 'IMAGE';

export interface LearningMaterial {
  id: string;
  title: string;
  type: MaterialType;
  icon: string;
  category: MaterialCategory;
  description: string;
  fileUrl: string;
  size: string;
  updatedAt: string;
  ageGroup?: '3-tuoi' | '4-tuoi' | '5-tuoi' | 'all';
}
