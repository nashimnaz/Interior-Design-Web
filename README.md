# LUMEN Interior Architecture — Studio Admin Panel

A premium, modern, responsive administrative portal designed specifically for luxury interior design, architectural atelier studios, and bespoke spatial curation practices.

Built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, **Recharts**, and **Prisma ORM with PostgreSQL**.

---

## 🎨 Visual Design System & Aesthetics

Crafted to match the high-end reference dashboard aesthetic:
- **Primary Background**: `#F5F8FF` (Very light ice blue & white canvas)
- **Main Surface**: `#FFFFFF` with refined borders `#E5EAF3`
- **Sidebar**: `#F8FAFF` with active state pill `#EBF2FF`, text `#477EFF`, and subtle elevation
- **Typography**: Clean modern sans-serif (**Inter**) with balanced optical weight hierarchy
- **Brand Accents**: Royal Electric Blue (`#477EFF`), Emerald Success (`#16A34A`), Warm Amber (`#F59E0B`), Crimson Alert (`#EF4444`)
- **Card & Component Styles**: Rounded corners (`rounded-2xl`), restrained shadows, circular icon containers, and clean dividers
- **Real Imagery**: Pre-loaded with photorealistic, high-resolution interior photography generated specifically for luxury residences, penthouses, marble kitchens, and commercial executive lounges.

---

## 📂 Core Administrative Modules

1. **Executive Dashboard (`/`)**
   - **4 Metric Summary Cards**: Total Projects, Published Articles, New Qualified Enquiries, and Verified Client Satisfaction Rating.
   - **Enquiry Overview Interactive Area Chart**: Recharts visual analytics with time range selector (*Last 7 Days*, *Last 30 Days*, *Last 90 Days*), custom tooltips, and performance badges.
   - **Recent Client Inquiries Table**: Real-time leads with service tags, budget ranges, and status badges.
   - **Portfolio Spotlight & Editorial Carousel**: Instant previews of recent signature works and articles.
   - **Quick Action Bar**: Shortcuts to log a project, compose a journal entry, or review leads.

2. **Gallery / Projects Management**
   - Grid layout of architectural works with high-res cover previews.
   - Filter by discipline (*Residential*, *Commercial*, *Kitchen*, *Living*, *Bedroom*, *Office*, *Penthouses*).
   - Filter by status (*Published*, *Draft*, *Featured*).
   - Lightbox modal preview with multi-image gallery views, client credentials, and square footage.
   - Comprehensive Project Creation & Edit Modal with image presets and SEO tags.
   - Publish/unpublish toggle, featured star toggle, and destructive delete dialog.

3. **Editorial Journal / Blog Management**
   - Grid and Table view toggles for articles.
   - Category filtering (*Design Trends*, *Sustainable Architecture*, *Lighting & Textures*, *Bespoke Furniture*, *Renovation Guides*).
   - Reading Mode Preview Modal.
   - Full-featured Editorial Writer Modal supporting excerpts, tags, author attribution, cover photos, and SEO metadata.
   - Publish/draft workflow with confirmation dialogs.

4. **Client Testimonials & Endorsements**
   - Endorsements with client avatar photos, client titles, star rating (1-5 stars), and associated architectural project link.
   - Approval pipeline (*Approved*, *Pending*, *Hidden*).
   - Homepage featured toggle for high-profile client reviews.
   - Add/Edit testimonial modal with real-time star rating selector.

5. **Client Enquiries & Lead Pipeline**
   - Comprehensive inquiry tracking (*New*, *In Progress*, *Contacted*, *Proposal Sent*, *Converted*, *Archived*).
   - High-priority status pill indicators and lead conversion stats.
   - Detailed Inspector Modal with 1-click email/call links, client brief, editable internal architect notes, and designer assignment.
   - Manual consultation lead entry form.

6. **Studio Settings & Brand Identity**
   - Studio trade name, tagline, concierge email, direct phone, and physical address.
   - Social channels (Instagram, LinkedIn) and default estimation currency.
   - Public showroom announcement notification message.
   - Automated lead dispatch notification toggle.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & custom design tokens
- **Data Visualizations**: Recharts
- **Icons**: Lucide React
- **ORM**: Prisma ORM with PostgreSQL provider (`prisma/schema.prisma`)
- **API Engine**: Next.js App Router API Handlers (`/api/stats`, `/api/projects`, `/api/blogs`, `/api/testimonials`, `/api/enquiries`, `/api/settings`)
- **Standalone Backend Server**: Node.js with Express (`server/server.js`)
- **Data Layer**: Persistent in-memory cache service (`src/lib/dataService.ts`) with immediate out-of-the-box operation and seamless Prisma PostgreSQL integration.

---

## 🚀 Running the Project

### 1. Start the Next.js Development Server (Recommended)
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Run Standalone Node.js Express Server
```bash
npm run server
```
The Express API runs at **[http://localhost:5000](http://localhost:5000)**.

### 3. Build for Production
```bash
npm run build
npm run start
```

### 4. Prisma PostgreSQL Database Configuration
When connecting to a live PostgreSQL database:
1. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/interiordesign?schema=public"
   ```
2. Run database migration:
   ```bash
   npx prisma migrate dev --name init
   ```
