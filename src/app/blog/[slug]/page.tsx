import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getStore } from '@/lib/dataService';
import { initialBlogs } from '@/lib/store';
import { BlogDetailClient } from '@/components/frontend/blog/BlogDetailClient';
import { BlogPost } from '@/lib/types';

export const instant = false;

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getArticleBySlug(slug: string): { article: BlogPost | null; related: BlogPost[] } {
  const store = getStore();
  const allBlogs = store?.blogs?.length ? store.blogs : initialBlogs;

  const article = allBlogs.find(
    (b) => b.slug.toLowerCase() === slug.toLowerCase()
  ) || null;

  if (!article) {
    return { article: null, related: [] };
  }

  // Increment views in memory store
  if (article) {
    article.views = (article.views || 0) + 1;
  }

  // Calculate 3 top related articles (matching category or shared tags)
  const related = allBlogs
    .filter((b) => b.id !== article.id && b.status === 'Published')
    .map((b) => {
      let score = 0;
      if (b.category === article.category) score += 3;
      const sharedTags = b.tags.filter((t) => article.tags.includes(t));
      score += sharedTags.length;
      return { blog: b, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.blog);

  return { article, related };
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | EXCORTO Editorial Journal',
      description: 'The requested architectural design journal article could not be located.',
    };
  }

  const siteUrl = 'https://excorto.in';
  const pageUrl = `${siteUrl}/blog/${article.slug}`;
  const ogImageUrl = article.coverImage.startsWith('http')
    ? article.coverImage
    : `${siteUrl}${article.coverImage}`;

  return {
    title: `${article.seoTitle || article.title} | EXCORTO Editorial Journal`,
    description: article.seoDescription || article.excerpt,
    keywords: article.seoKeywords || article.tags.join(', '),
    authors: [{ name: article.author }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      url: pageUrl,
      siteName: 'EXCORTO Builders & Interiors',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const { article, related } = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Schema.org Article Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole || 'Architect',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EXCORTO Builders & Interiors',
      logo: {
        '@type': 'ImageObject',
        url: 'https://excorto.in/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://excorto.in/blog/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient initialArticle={article} initialRelated={related} />
    </>
  );
}
