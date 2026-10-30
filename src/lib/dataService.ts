import fs from 'fs';
import path from 'path';
import { 
  Project, 
  BlogPost, 
  Testimonial, 
  Enquiry, 
  SiteSetting, 
  DashboardStats,
  NewsletterSubscriber,
  ServiceItem,
  PageContent
} from './types';
import { 
  initialProjects, 
  initialBlogs, 
  initialTestimonials, 
  initialEnquiries, 
  initialSiteSettings, 
  initialDashboardStats,
  initialNewsletterSubscribers,
  initialServices,
  initialPageContent
} from './store';

export interface InteriorStoreState {
  projects: Project[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  pageContent: PageContent;
  enquiries: Enquiry[];
  subscribers: NewsletterSubscriber[];
  settings: SiteSetting;
  stats: DashboardStats;
}

// Global cache to maintain persistent mutations across API requests
declare global {
  // eslint-disable-next-line no-var
  var __interiorStore: InteriorStoreState | undefined;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

export function saveStoreToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (global.__interiorStore) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(global.__interiorStore, null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[dataService] Failed to persist store to disk:', err);
  }
}

function loadStoreFromDisk(): InteriorStoreState | null {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      if (content && content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (err) {
    console.warn('[dataService] Failed to load store from disk, using defaults:', err);
  }
  return null;
}

const defaultBlogs = Array.isArray(initialBlogs) ? initialBlogs : [];
const defaultSubscribers = Array.isArray(initialNewsletterSubscribers) ? initialNewsletterSubscribers : [];
const defaultServices = Array.isArray(initialServices) ? initialServices : [];

if (!global.__interiorStore) {
  const diskData = loadStoreFromDisk();
  if (diskData) {
    global.__interiorStore = {
      projects: diskData.projects || [...(Array.isArray(initialProjects) ? initialProjects : [])],
      blogs: diskData.blogs || [...defaultBlogs],
      testimonials: diskData.testimonials || [...(Array.isArray(initialTestimonials) ? initialTestimonials : [])],
      services: diskData.services || [...defaultServices],
      pageContent: diskData.pageContent || { ...initialPageContent },
      enquiries: diskData.enquiries || [...(Array.isArray(initialEnquiries) ? initialEnquiries : [])],
      subscribers: diskData.subscribers || [...defaultSubscribers],
      settings: diskData.settings || { ...initialSiteSettings },
      stats: diskData.stats || { ...initialDashboardStats }
    };
  } else {
    global.__interiorStore = {
      projects: [...(Array.isArray(initialProjects) ? initialProjects : [])],
      blogs: [...defaultBlogs],
      testimonials: [...(Array.isArray(initialTestimonials) ? initialTestimonials : [])],
      services: [...defaultServices],
      pageContent: { ...initialPageContent },
      enquiries: [...(Array.isArray(initialEnquiries) ? initialEnquiries : [])],
      subscribers: [...defaultSubscribers],
      settings: { ...initialSiteSettings },
      stats: { ...initialDashboardStats }
    };
    saveStoreToDisk();
  }
} else {
  // Ensure newly added initial items are present in hot reload memory
  const existingProjIds = new Set(global.__interiorStore.projects.map(p => p.id));
  const missingProjects = (Array.isArray(initialProjects) ? initialProjects : []).filter(p => !existingProjIds.has(p.id));
  if (missingProjects.length > 0) {
    global.__interiorStore.projects.push(...missingProjects);
  }

  // Ensure services exist
  if (!global.__interiorStore.services || global.__interiorStore.services.length === 0) {
    global.__interiorStore.services = [...defaultServices];
  }

  // Ensure pageContent exists
  if (!global.__interiorStore.pageContent) {
    global.__interiorStore.pageContent = { ...initialPageContent };
  }

  // Always sync latest initialBlogs if count changed or missing
  if (defaultBlogs.length > 0) {
    const currentSlugs = new Set(global.__interiorStore.blogs.map(b => b.slug));
    const hasNewArticles = defaultBlogs.some(b => !currentSlugs.has(b.slug));
    if (hasNewArticles || global.__interiorStore.blogs.length < defaultBlogs.length) {
      const existingViews = new Map(global.__interiorStore.blogs.map(b => [b.slug, b.views || 0]));
      global.__interiorStore.blogs = defaultBlogs.map(b => ({
        ...b,
        views: existingViews.get(b.slug) ?? b.views
      }));
    }
  }

  // Ensure subscribers array exists
  if (!global.__interiorStore.subscribers || global.__interiorStore.subscribers.length === 0) {
    global.__interiorStore.subscribers = [...defaultSubscribers];
  }
}

export const getStore = (): InteriorStoreState => global.__interiorStore!;

export const recalculateStats = () => {
  const store = getStore();
  const totalProjects = store.projects.length;
  const activeProjects = store.projects.filter(p => p.status === 'Published').length;
  const publishedBlogs = store.blogs.filter(b => b.status === 'Published').length;
  const draftBlogs = store.blogs.filter(b => b.status === 'Draft').length;
  const newEnquiries = store.enquiries.filter(e => e.status === 'New').length;
  const totalEnquiries = store.enquiries.length;
  const convertedEnquiries = store.enquiries.filter(e => e.status === 'Converted').length;
  const conversionRate = totalEnquiries > 0 ? Number(((convertedEnquiries / totalEnquiries) * 100).toFixed(1)) : 0;
  const approvedTestimonials = store.testimonials.filter(t => t.status === 'Approved');
  const averageRating = approvedTestimonials.length > 0 
    ? Number((approvedTestimonials.reduce((acc, t) => acc + t.rating, 0) / approvedTestimonials.length).toFixed(2))
    : 5.0;

  store.stats = {
    ...store.stats,
    totalProjects,
    activeProjects,
    publishedBlogs,
    draftBlogs,
    newEnquiries,
    totalEnquiries,
    conversionRate,
    averageRating,
    totalTestimonials: store.testimonials.length
  };

  saveStoreToDisk();
  return store.stats;
};
