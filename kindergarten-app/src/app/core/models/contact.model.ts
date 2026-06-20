export type SocialPlatform = 'facebook' | 'zalo' | 'youtube' | 'instagram' | 'tiktok';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  handle: string;
}

export interface WorkingHours {
  label: string;
  hours: string;
}

export interface ContactInfo {
  schoolName: string;
  address: string;
  district: string;
  city: string;
  phones: string[];
  email: string;
  workingHours: WorkingHours[];
  googleMapsEmbedUrl: string;
  socialLinks: SocialLink[];
}
