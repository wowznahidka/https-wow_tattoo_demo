export type Language = 'uk' | 'en';

export type TattooStyle =
  | 'all'
  | 'blackwork'
  | 'fineline'
  | 'microrealism'
  | 'neotraditional'
  | 'japanese'
  | 'ornamental'
  | 'watercolor'
  | 'coverup'
  | 'lettering';

export interface Artist {
  id: string;
  name: string;
  alias: string;
  role: string;
  roleEn: string;
  avatar: string;
  coverImage: string;
  experienceYears: number;
  specialties: TattooStyle[];
  specialtyTitles: { uk: string; en: string }[];
  bio: { uk: string; en: string };
  hourlyRate: number; // UAH
  sessionRate: number; // UAH (full-day 6h)
  instagram: string;
  telegram: string;
  rating: number;
  completedTattoos: number;
  availableDays: string[];
  featuredWorks: string[];
}

export interface GalleryItem {
  id: string;
  title: { uk: string; en: string };
  style: TattooStyle;
  placement: string;
  placementEn: string;
  artistId: string;
  artistName: string;
  imageUrl: string;
  beforeImageUrl?: string; // For cover-ups
  durationHours: number;
  sessionsCount: number;
  description: { uk: string; en: string };
  tags: string[];
  likes: number;
}

export interface FlashDesign {
  id: string;
  title: { uk: string; en: string };
  style: TattooStyle;
  artistId: string;
  artistName: string;
  imageUrl: string;
  priceUah: number;
  priceUsd: number;
  recommendedSizeCm: string;
  estimatedHours: number;
  isReserved: boolean;
  tags: string[];
}

export interface BodyZone {
  id: string;
  name: { uk: string; en: string };
  painLevel: number; // 1 to 10
  painDescription: { uk: string; en: string };
  healingDifficulty: 'easy' | 'medium' | 'hard';
  popularStyles: string[];
  tips: { uk: string; en: string };
  coordinates: { x: number; y: number; view: 'front' | 'back' };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  artistName: string;
  tattooTitle: { uk: string; en: string };
  comment: { uk: string; en: string };
  photoUrl?: string;
  verified: boolean;
}

export interface ServiceItem {
  id: string;
  title: { uk: string; en: string };
  description: { uk: string; en: string };
  priceFromUah: number;
  duration: { uk: string; en: string };
  iconName: string;
  popular?: boolean;
}

export interface FaqItem {
  id: string;
  question: { uk: string; en: string };
  answer: { uk: string; en: string };
  category: 'booking' | 'process' | 'care' | 'pain';
}

export interface BookingFormData {
  serviceId: string;
  artistId: string;
  customIdea: string;
  style: TattooStyle;
  bodyPlacement: string;
  estimatedSize: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  telegramOrInstagram: string;
  referenceImageBase64?: string;
  isFirstTattoo: boolean;
  notes: string;
}

export interface AiConsultationRequest {
  idea: string;
  placement: string;
  stylePreference?: string;
  mood?: string;
  size?: string;
  language: Language;
}

export interface AiConsultationResponse {
  conceptTitle: string;
  artisticDescription: string;
  recommendedStyle: string;
  colorPalette: string[];
  suggestedElements: string[];
  optimalPlacement: string;
  estimatedSessions: string;
  painLevelAdvice: string;
  artistPromptGuidance: string;
}

export type PageTab = 'all' | 'gallery' | 'flash' | 'artists' | 'services' | 'standards' | 'reviews' | 'faq';
