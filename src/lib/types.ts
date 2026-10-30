export type ProjectCategory = 
  | 'Residential'
  | 'Commercial'
  | 'Interior'
  | 'Renovation'
  | 'Residential Interiors' 
  | 'Commercial Interiors' 
  | 'Kitchen Design' 
  | 'Living Spaces' 
  | 'Bedroom Design' 
  | 'Office Interiors'
  | 'Penthouses & Villas'
  | string;

export type PublicationStatus = 'Published' | 'Draft' | 'Archived';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  location: string;
  clientName: string;
  year: string;
  areaSqFt: number;
  coverImage: string;
  images: string[];
  featured: boolean;
  status: PublicationStatus;
  displayOrder: number;
  seoTitle?: string;
  seoDesc?: string;
  createdAt: string;
}

export type BlogCategory = 
  | 'Interior Design'
  | 'Home Construction'
  | 'Space Planning'
  | 'Materials & Finishes'
  | 'Tips & Guides'
  | 'Design Trends' 
  | 'Sustainable Architecture' 
  | 'Lighting & Textures' 
  | 'Bespoke Furniture' 
  | 'Renovation Guides';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  authorRole: string;
  authorImage?: string;
  readTime: string;
  status: 'Published' | 'Draft';
  publishedAt: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDesc?: string;
  seoKeywords?: string;
  views: number;
  featured?: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientPhoto: string;
  quote: string;
  rating: number; // 1 to 5
  projectTitle: string;
  status: 'Approved' | 'Pending' | 'Hidden';
  clientLocation?: string;
  displayOrder?: number;
  featured: boolean;
  createdAt: string;
}

export type EnquiryStatus = 
  | 'New' 
  | 'In Progress' 
  | 'Contacted' 
  | 'Proposal Sent' 
  | 'Converted' 
  | 'Archived';

export interface Enquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: EnquiryStatus;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface SiteSetting {
  studioName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagram: string;
  linkedin: string;
  defaultCurrency: string;
  autoNotifyEnquiries: boolean;
  featuredNotice?: string;
}

export interface ChartPoint {
  date: string;
  enquiries: number;
  consultations: number;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  publishedBlogs: number;
  draftBlogs: number;
  newEnquiries: number;
  totalEnquiries: number;
  conversionRate: number;
  averageRating: number;
  totalTestimonials: number;
  trends: {
    projects: string;
    blogs: string;
    enquiries: string;
    testimonials: string;
  };
  chartData: {
    '7d': ChartPoint[];
    '30d': ChartPoint[];
    '90d': ChartPoint[];
  };
export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  number: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  additionalImages?: string[];
  deliverables: string[];
  features: string[];
  displayOrder: number;
  seoTitle?: string;
  seoDesc?: string;
  status: 'Published' | 'Draft';
  createdAt?: string;
}

export interface HomeContent {
  heroEyebrow: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  heroImageDesktop: string;
  heroImageMobile: string;
  heroCtaText: string;
  aboutEyebrow: string;
  aboutHeadline: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutCtaText: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  storyHeadline: string;
  storyParagraph1: string;
  storyParagraph2: string;
}

export interface ContactContent {
  heading: string;
  subheading: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  mapsUrl: string;
}

export interface PageContent {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
}
