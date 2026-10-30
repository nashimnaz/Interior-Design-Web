import { MetadataRoute } from 'next';
import { initialBlogs } from '@/lib/store';
import { getStore } from '@/lib/dataService';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://excorto.in';
  let blogs = initialBlogs;
  try {
    const store = getStore();
    if (store?.blogs?.length) {
      blogs = store.blogs;
    }
  } catch (_) {}

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((b) => b.status === 'Published')
    .map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...blogRoutes];
}
