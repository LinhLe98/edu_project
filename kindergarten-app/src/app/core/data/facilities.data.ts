import { Facility } from '../models';

const makePhotos = (seed: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${seed}-photo-${i + 1}`,
    src: `https://picsum.photos/seed/${seed}-${i + 1}/800/600`,
    alt: `Ảnh ${i + 1}`,
    width: 800,
    height: 600,
  }));

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'facility-1',
    name: 'Phòng Học',
    description: 'Các phòng học rộng rãi, được trang bị đầy đủ đồ chơi giáo dục, bảng tương tác và góc đọc sách. Không gian thoáng mát, đảm bảo ánh sáng tự nhiên.',
    images: makePhotos('facility-1', 4),
    iconEmoji: '🏫',
  },
  {
    id: 'facility-2',
    name: 'Sân Chơi Ngoài Trời',
    description: 'Sân chơi rộng với cỏ nhân tạo mềm mại, cầu trượt, xích đu và khu vực vận động đa năng. An toàn và vui vẻ cho các bé.',
    images: makePhotos('facility-2', 4),
    iconEmoji: '🌳',
  },
  {
    id: 'facility-3',
    name: 'Phòng Thư Viện',
    description: 'Thư viện mini với hơn 500 đầu sách tranh thiếu nhi. Không gian ấm cúng khuyến khích tình yêu đọc sách từ nhỏ.',
    images: makePhotos('facility-3', 3),
    iconEmoji: '📖',
  },
  {
    id: 'facility-4',
    name: 'Nhà Bếp & Phòng Ăn',
    description: 'Bếp ăn đạt tiêu chuẩn vệ sinh an toàn thực phẩm. Thực đơn dinh dưỡng được thiết kế bởi chuyên gia dinh dưỡng.',
    images: makePhotos('facility-4', 3),
    iconEmoji: '🍽️',
  },
  {
    id: 'facility-5',
    name: 'Phòng Y Tế',
    description: 'Phòng y tế với nhân viên y tế chuyên trách, trang bị đầy đủ để chăm sóc sức khỏe cho các bé trong suốt thời gian ở trường.',
    images: makePhotos('facility-5', 2),
    iconEmoji: '🏥',
  },
  {
    id: 'facility-6',
    name: 'Phòng Âm Nhạc',
    description: 'Phòng âm nhạc trang bị đàn piano, trống, xylophone và các nhạc cụ đa dạng. Nơi các bé khám phá và phát triển năng khiếu âm nhạc.',
    images: makePhotos('facility-6', 3),
    iconEmoji: '🎵',
  },
];
