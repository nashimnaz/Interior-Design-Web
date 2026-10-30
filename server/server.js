const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory fallback / Prisma data layer
let projects = [
  {
    id: 'proj-1',
    title: 'The Bel Air Minimalist Pavilion',
    slug: 'the-bel-air-minimalist-pavilion',
    category: 'Residential Interiors',
    description: 'A 6,800 sq ft luxury residence harmonizing warm white oak wall paneling and floor-to-ceiling glass.',
    location: 'Bel Air, Los Angeles, CA',
    clientName: 'The Harrison Family',
    year: '2026',
    areaSqFt: 6800,
    coverImage: '/images/projects/living-room.jpg',
    images: ['/images/projects/living-room.jpg', '/images/projects/dining.jpg'],
    featured: true,
    status: 'Published',
    displayOrder: 1,
    createdAt: new Date().toISOString()
  }
];

let blogs = [
  {
    id: 'blog-1',
    title: 'The Quiet Luxury Palette: Textural Neutrals & Raw Earth Pigments',
    slug: 'the-quiet-luxury-palette-textural-neutrals',
    excerpt: 'How subdued tones, natural lime plasters, and tactile textiles create enduring sanctuaries.',
    content: 'Full article body on quiet luxury in contemporary interior architecture...',
    coverImage: '/images/blogs/trends-2026.jpg',
    category: 'Design Trends',
    tags: ['Quiet Luxury', 'Artisanal Plaster'],
    author: 'Clara Delacroix',
    authorRole: 'Design Director',
    readTime: '6 min read',
    status: 'Published',
    publishedAt: new Date().toISOString(),
    views: 1840
  }
];

let enquiries = [
  {
    id: 'enq-101',
    clientName: 'Sophia Montgomery',
    email: 'sophia.montgomery@vanderbilt.com',
    phone: '+1 (415) 890-3321',
    service: 'Full Home Architecture & Interior',
    budget: '$300,000 - $500,000',
    timeline: 'Within 6 months',
    message: 'Seeking LUMEN to lead gut renovation and bespoke furniture procurement.',
    status: 'New',
    createdAt: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Interior Design Express API', timestamp: new Date() });
});

// Projects Endpoints
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: projects });
});

app.post('/api/projects', (req, res) => {
  const newProj = { id: `proj-${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
  projects.unshift(newProj);
  res.status(201).json({ success: true, data: newProj });
});

// Blogs Endpoints
app.get('/api/blogs', (req, res) => {
  res.json({ success: true, data: blogs });
});

app.post('/api/blogs', (req, res) => {
  const newBlog = { id: `blog-${Date.now()}`, ...req.body, createdAt: new Date().toISOString() };
  blogs.unshift(newBlog);
  res.status(201).json({ success: true, data: newBlog });
});

// Enquiries Endpoints
app.get('/api/enquiries', (req, res) => {
  res.json({ success: true, data: enquiries });
});

app.post('/api/enquiries', (req, res) => {
  const newEnq = { id: `enq-${Date.now()}`, ...req.body, status: 'New', createdAt: new Date().toISOString() };
  enquiries.unshift(newEnq);
  res.status(201).json({ success: true, data: newEnq });
});

app.listen(PORT, () => {
  console.log(`Interior Design Express Server running on port ${PORT}`);
});
