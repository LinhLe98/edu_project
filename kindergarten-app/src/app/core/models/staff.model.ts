export type StaffDepartment =
  | 'ban-giam-hieu'
  | 'to-giao-vien-la'
  | 'to-giao-vien-choi'
  | 'to-giao-vien-mam'
  | 'to-nhan-vien';

export type GroupRole = 'LEADER' | 'VICE_LEADER' | 'MEMBER';

export interface StaffMember {
  id: string;
  fullName: string;
  role: string;
  department: StaffDepartment;
  photo: string;
  bio: string;
  qualifications: string[];
  featured: boolean;
  groupRole?: GroupRole;
  classInfo?: string;
  experience?: number;
  specialties?: string[];
  email?: string;
}
