import { Project, BlogPost, Testimonial, Enquiry, SiteSetting, DashboardStats, ServiceItem, PageContent } from './types';

// Seed Projects featuring high-end architectural images
export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'The Bel Air Minimalist Pavilion',
    slug: 'the-bel-air-minimalist-pavilion',
    category: 'Residential Interiors',
    description: 'A 6,800 sq ft luxury residence harmonizing warm white oak wall paneling, expansive panoramic floor-to-ceiling glass, and bespoke bouclé living appointments.',
    location: 'Bel Air, Los Angeles, CA',
    clientName: 'The Harrison Family',
    year: '2026',
    areaSqFt: 6800,
    coverImage: '/images/projects/living-room.jpg',
    images: [
      '/images/projects/living-room.jpg',
      '/images/projects/dining.jpg',
      '/images/projects/kitchen.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 1,
    seoTitle: 'Bel Air Minimalist Pavilion | Luxury Interior Architecture',
    seoDesc: 'Explore our latest residential design: warm oak paneling, custom bouclé furniture, and indoor-outdoor living.',
    createdAt: '2026-10-14T09:30:00Z'
  },
  {
    id: 'proj-2',
    title: 'Tribeca Culinary Atelier & Kitchen',
    slug: 'tribeca-culinary-atelier',
    category: 'Kitchen Design',
    description: 'Sculptural Calacatta marble waterfall island paired with fluted smoked oak joinery, architectural brass lighting, and integrated Gaggenau appliances.',
    location: 'Tribeca, New York, NY',
    clientName: 'Julian & Elena Vance',
    year: '2026',
    areaSqFt: 1200,
    coverImage: '/images/projects/kitchen.jpg',
    images: [
      '/images/projects/kitchen.jpg',
      '/images/projects/dining.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 2,
    seoTitle: 'Tribeca Culinary Atelier | Bespoke Marble Kitchen Architecture',
    seoDesc: 'Calacatta marble waterfall kitchen with smoked oak cabinetry and designer brass accents.',
    createdAt: '2026-10-08T14:15:00Z'
  },
  {
    id: 'proj-3',
    title: 'Serenity Master Suite & Dressing Lounge',
    slug: 'serenity-master-suite',
    category: 'Bedroom Design',
    description: 'Bespoke linen fluted headboard sanctuary with indirect cove illumination, private walnut dressing room, and integrated cashmere wool draperies.',
    location: 'Greenwich, Connecticut',
    clientName: 'Marcus Sterling',
    year: '2026',
    areaSqFt: 1850,
    coverImage: '/images/projects/bedroom.jpg',
    images: [
      '/images/projects/bedroom.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 3,
    seoTitle: 'Serenity Master Suite | Bespoke Bedroom Interior Design',
    seoDesc: 'Luxury master bedroom featuring fluted linen upholstery, walnut nightstands, and ambient lighting.',
    createdAt: '2026-09-22T11:00:00Z'
  },
  {
    id: 'proj-4',
    title: 'Venture Capital Headquarters & Executive Salon',
    slug: 'venture-capital-headquarters',
    category: 'Commercial Interiors',
    description: 'A 14,000 sq ft financial executive lounge featuring reeded acoustic glass dividers, white oak acoustic slats, biophilic planters, and bespoke Italian leather seating.',
    location: 'Hudson Yards, New York, NY',
    clientName: 'Apex Capital Partners',
    year: '2025',
    areaSqFt: 14000,
    coverImage: '/images/projects/office.jpg',
    images: [
      '/images/projects/office.jpg',
      '/images/projects/dining.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 4,
    seoTitle: 'Hudson Yards Executive Headquarters | Commercial Interior Architecture',
    seoDesc: 'Biophilic executive commercial interior design in Hudson Yards.',
    createdAt: '2026-08-19T16:45:00Z'
  },
  {
    id: 'proj-5',
    title: 'Skyline Penthouse Salon & Formal Dining',
    slug: 'skyline-penthouse-salon',
    category: 'Living Spaces',
    description: 'Dramatic double-height formal entertaining salon featuring a floating raw-edge travertine table, custom geometric brass chandelier, and 270-degree sunset skyline views.',
    location: 'Brickell, Miami, FL',
    clientName: 'Camila Rodriguez',
    year: '2026',
    areaSqFt: 4200,
    coverImage: '/images/projects/dining.jpg',
    images: [
      '/images/projects/dining.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 5,
    seoTitle: 'Skyline Penthouse Salon | High-End Interior Architecture',
    seoDesc: 'Miami penthouse dining with panoramic city views and bespoke bronze lighting.',
    createdAt: '2026-10-01T10:20:00Z'
  },
  {
    id: 'proj-6',
    title: 'Courtyard House & Open Sky Sanctuary',
    slug: 'courtyard-house-and-sanctuary',
    category: 'Residential',
    description: 'An architectural home built around an internal courtyard, integrating natural ventilation, rainwater reflection channels, and terracotta breeze blocks.',
    location: 'Kollam, Kerala',
    clientName: 'Dr. K. Nambiar',
    year: '2026',
    areaSqFt: 5400,
    coverImage: '/images/selected-work/project-03-courtyard-house.jpg',
    images: [
      '/images/selected-work/project-03-courtyard-house.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 6,
    seoTitle: 'Courtyard House | Tropical Residential Architecture in Kerala',
    seoDesc: 'Bespoke courtyard residence celebrating indoor-outdoor harmony and microclimate design.',
    createdAt: '2026-09-18T14:30:00Z'
  },
  {
    id: 'proj-7',
    title: 'Modernist Coastal Villa at Sunset',
    slug: 'modernist-coastal-villa',
    category: 'Residential',
    description: 'A contemporary luxury waterfront villa featuring monolithic board-formed concrete walls, panoramic horizon glazing, and landscaped native gardens.',
    location: 'Varkala, Kerala',
    clientName: 'Sunil & Meera Menon',
    year: '2026',
    areaSqFt: 7200,
    coverImage: '/images/Modern Coastal Villa at Sunset.png',
    images: [
      '/images/Modern Coastal Villa at Sunset.png',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 7,
    seoTitle: 'Modernist Coastal Villa | Waterfront Luxury Architecture',
    seoDesc: 'Luxury cliffside residential villa with panoramic ocean views and sustainable passive cooling.',
    createdAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'proj-8',
    title: 'Serene Mediterranean Residence',
    slug: 'serene-mediterranean-residence',
    category: 'Residential',
    description: 'Warm textural neutrals, artisanal lime-washed archways, handcrafted terracotta tiles, and integrated bespoke bouclé daybeds.',
    location: 'Kochi, Kerala',
    clientName: 'Arjun & Ananya Nair',
    year: '2025',
    areaSqFt: 4600,
    coverImage: '/images/Serene Mediterranean Living Corner.png',
    images: [
      '/images/Serene Mediterranean Living Corner.png',
      '/images/projects/dining.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 8,
    seoTitle: 'Serene Mediterranean Residence | Organic Minimalist Home',
    seoDesc: 'Warm minimalist private home blending Mediterranean earthiness with contemporary Kerala lifestyle.',
    createdAt: '2026-08-25T09:15:00Z'
  },
  {
    id: 'proj-9',
    title: 'Suburban Architectural Villa',
    slug: 'suburban-architectural-villa',
    category: 'Residential',
    description: 'Multi-level cantilevered residential residence harmonizing structural steel, local laterite stone claddings, and deep shaded verandas.',
    location: 'Thiruvananthapuram, Kerala',
    clientName: 'Praveen Varma',
    year: '2025',
    areaSqFt: 5800,
    coverImage: '/images/selected-work/project-01-residential-home.jpg',
    images: [
      '/images/selected-work/project-01-residential-home.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 9,
    seoTitle: 'Suburban Architectural Villa | Contemporary Home Design',
    seoDesc: 'Architectural planning and turnkey residential execution in Thiruvananthapuram.',
    createdAt: '2026-08-12T16:00:00Z'
  },
  {
    id: 'proj-10',
    title: 'Atelier Architecture & Design Studio',
    slug: 'atelier-architecture-studio',
    category: 'Commercial',
    description: 'A dynamic creative workplace with polished concrete flooring, exposed waffle slabs, acoustic wood batten dividers, and custom library joinery.',
    location: 'Kochi, Kerala',
    clientName: 'Design Atelier Collective',
    year: '2026',
    areaSqFt: 6200,
    coverImage: '/images/projects/architect-studio.jpg',
    images: [
      '/images/projects/architect-studio.jpg',
      '/images/projects/office.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 10,
    seoTitle: 'Atelier Architecture Studio | Creative Commercial Workplace',
    seoDesc: 'High-performance creative studio interior balancing acoustic comfort and industrial elegance.',
    createdAt: '2026-07-30T10:00:00Z'
  },
  {
    id: 'proj-11',
    title: 'Luminary Executive Boardroom & Offices',
    slug: 'luminary-executive-offices',
    category: 'Commercial',
    description: 'Sophisticated corporate headquarters with acoustic micro-perforated wood paneling, motorized concealed privacy louvers, and leather conference appointments.',
    location: 'Bengaluru, Karnataka',
    clientName: 'Luminary Technologies Ltd',
    year: '2026',
    areaSqFt: 11500,
    coverImage: '/images/cards/card-commercial.jpg',
    images: [
      '/images/cards/card-commercial.jpg',
      '/images/projects/office.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 11,
    seoTitle: 'Luminary Executive Offices | Modern Corporate Interior',
    seoDesc: 'Commercial fitout and turnkey execution for corporate tech headquarters.',
    createdAt: '2026-07-15T13:45:00Z'
  },
  {
    id: 'proj-12',
    title: 'Botanical Wellness & Aesthetic Pavilion',
    slug: 'botanical-wellness-pavilion',
    category: 'Commercial',
    description: 'Holistic wellness clinic designed around biophilic courtyard gardens, soft curved gypsum partitions, ambient warm illumination, and natural limestone floors.',
    location: 'Alappuzha, Kerala',
    clientName: 'AyurVida Wellness Group',
    year: '2025',
    areaSqFt: 4800,
    coverImage: '/images/services/consult-card.jpg',
    images: [
      '/images/services/consult-card.jpg',
      '/images/projects/dining.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 12,
    seoTitle: 'Botanical Wellness Pavilion | Commercial Healthcare Architecture',
    seoDesc: 'Tranquil wellness architecture integrating restorative daylight and therapeutic landscape elements.',
    createdAt: '2026-06-28T09:30:00Z'
  },
  {
    id: 'proj-13',
    title: 'Modernist Living & Gallery Salon',
    slug: 'modernist-living-gallery-salon',
    category: 'Interior',
    description: 'An open-concept living space crafted with warm oak ceiling baffles, bespoke linear sectional seating, and custom illuminated art display niches.',
    location: 'Kochi, Kerala',
    clientName: 'Dev & Rohini Sharma',
    year: '2026',
    areaSqFt: 2800,
    coverImage: '/images/selected-work/project-02-modern-interiors.jpg',
    images: [
      '/images/selected-work/project-02-modern-interiors.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 13,
    seoTitle: 'Modernist Living & Gallery Salon | Contemporary Interior Design',
    seoDesc: 'Curated residential interior architecture with bespoke furniture and gallery lighting.',
    createdAt: '2026-06-14T15:20:00Z'
  },
  {
    id: 'proj-14',
    title: 'Bespoke Walnut Joinery & Wardrobe Suite',
    slug: 'bespoke-walnut-wardrobe-suite',
    category: 'Interior',
    description: 'Precision millwork and turnkey wardrobe installation with integrated sensor LED lighting, smoked glass doors, and fluted acoustic backdrops.',
    location: 'Thiruvananthapuram, Kerala',
    clientName: 'Sanjay Krishnan',
    year: '2026',
    areaSqFt: 1600,
    coverImage: '/images/services/install-card.jpg',
    images: [
      '/images/services/install-card.jpg',
      '/images/projects/bedroom.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 14,
    seoTitle: 'Bespoke Walnut Joinery & Wardrobe Suite | Custom Turnkey Fitout',
    seoDesc: 'Master suite architectural joinery and custom walk-in wardrobe execution.',
    createdAt: '2026-05-22T11:40:00Z'
  },
  {
    id: 'proj-15',
    title: 'Sculptural Sunlit Archway Interior',
    slug: 'sculptural-sunlit-archway-interior',
    category: 'Interior',
    description: 'Artisanal lime-plastered portal frames connecting serene living zones, paired with raw travertine plinths and minimalist sculptural ceramics.',
    location: 'Thrissur, Kerala',
    clientName: 'Vipin & Reshma Thomas',
    year: '2025',
    areaSqFt: 3400,
    coverImage: '/images/Sunlit Mediterranean Archway Interior.png',
    images: [
      '/images/Sunlit Mediterranean Archway Interior.png',
      '/images/projects/living-room.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 15,
    seoTitle: 'Sculptural Sunlit Archway Interior | Mediterranean Minimalist Design',
    seoDesc: 'Interior spatial transformation celebrating daylight, raw textures, and organic transitions.',
    createdAt: '2026-05-08T14:00:00Z'
  },
  {
    id: 'proj-16',
    title: 'Contemporary Spatial Interior & Media Lounge',
    slug: 'contemporary-spatial-interior',
    category: 'Interior',
    description: 'Acoustically isolated private cinema and lounge featuring micro-cement flooring, hidden pocket sound diffusers, and low-slung Italian modular lounges.',
    location: 'Kottayam, Kerala',
    clientName: 'George & Mini Mathew',
    year: '2025',
    areaSqFt: 2200,
    coverImage: '/images/selected-work/project-04-contemporary-space.jpg',
    images: [
      '/images/selected-work/project-04-contemporary-space.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 16,
    seoTitle: 'Contemporary Spatial Interior | High-End Residential Media Lounge',
    seoDesc: 'Precision acoustic ceiling design and turnkey media lounge fitout.',
    createdAt: '2026-04-19T10:10:00Z'
  },
  {
    id: 'proj-17',
    title: 'Heritage Colonial Villa Adaptive Restoration',
    slug: 'heritage-colonial-villa-restoration',
    category: 'Renovation',
    description: 'Sensitive structural stabilization and contemporary interior retrofit of an 85-year-old traditional Dutch-Portuguese colonial manor.',
    location: 'Fort Kochi, Kerala',
    clientName: 'Heritage Hospitality Group',
    year: '2026',
    areaSqFt: 8400,
    coverImage: '/images/hero-villa.jpg',
    images: [
      '/images/hero-villa.jpg',
      '/images/projects/dining.jpg'
    ],
    featured: true,
    status: 'Published',
    displayOrder: 17,
    seoTitle: 'Heritage Colonial Villa Restoration | Historic Architecture Renovation',
    seoDesc: 'Adaptive reuse and structural restoration of historic colonial architecture in Fort Kochi.',
    createdAt: '2026-03-25T16:30:00Z'
  },
  {
    id: 'proj-18',
    title: 'Mid-Century Minimalist Courtyard Renovation',
    slug: 'mid-century-courtyard-renovation',
    category: 'Renovation',
    description: 'Total architectural overhaul of a 1970s residence, removing compartmentalized masonry walls to introduce natural skylights and a sunken living deck.',
    location: 'Calicut, Kerala',
    clientName: 'Ranjit & Maya Pillai',
    year: '2025',
    areaSqFt: 4100,
    coverImage: '/images/why-choose-us.jpg',
    images: [
      '/images/why-choose-us.jpg',
      '/images/projects/living-room.jpg'
    ],
    featured: false,
    status: 'Published',
    displayOrder: 18,
    seoTitle: 'Mid-Century Courtyard Renovation | Residential Remodel in Kerala',
    seoDesc: 'Transformative residential renovation creating open light-filled family living.',
    createdAt: '2026-02-14T09:00:00Z'
  }
];

// Seed Editorial Blogs
export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Creating Timeless Interiors That Feel Like Home',
    slug: 'creating-timeless-interiors-that-feel-like-home',
    excerpt: 'Discover how thoughtful material selection, natural lighting, balanced proportions and carefully curated details create interiors that remain beautiful for years.',
    content: `## 1. The Foundations of Timeless Architecture

True timelessness in interior architecture is not defined by an absence of personality, but by a quiet commitment to enduring proportions, honest materiality, and spatial clarity. In an era dominated by fleeting algorithmic micro-trends, homes designed around genuine human comfort inevitably outlive those assembled for temporary visual novelty.

When an architectural interior is conceived with restraint, each room breathes. Walls do not compete with furniture; daylight is welcomed as a primary building material; and the boundaries between the built sanctuary and its external natural landscape dissolve.

> *"A timeless space does not demand immediate applause. It reveals its generosity slowly, over decades of lived experience, morning light, and quiet evenings."*

---

## 2. The Tactile Power of Natural Materials

Material selection is the emotional cornerstone of interior architecture. Synthetic laminates and simulated finishes may offer temporary convenience, but only natural, unadorned materials possess the capacity to develop a dignified patina over time.

### The Core Architectural Palette:
- **Honed Travertine & Limestone**: Porous, earthen, and cool to the touch. They absorb daylight softly rather than bouncing harsh specular reflections.
- **Solid White Oak & Teak**: Responsibly harvested timber brings organic warmth, tactile grain, and acoustic gentleness to residential pavilions.
- **Unlacquered Living Bronze**: Metals that celebrate human touch by oxidizing naturally over years of interaction.
- **Pure Belgian Linen & Wool**: Breathable, tactile drapery that softens architectural lines and filters harsh afternoon illumination.

| Material | Architectural Role | Patina Characteristic | Longevity |
| :--- | :--- | :--- | :--- |
| **Honed Travertine** | Flooring, Fireplaces, Islands | Deepens in warmth, softens edges | Generations |
| **White Oak** | Millwork, Slatted Ceilings | Warm golden ambering | 50+ Years |
| **Raw Bronze** | Hardware, Luminescence | Rich dark verdigris oxidation | Indefinite |
| **Slubbed Linen** | Drapes, Upholstery | Softens drape and weave | Decades |

---

## 3. Calibrating Daylight & Architectural Shading

Natural illumination is the living breath of high-end residential interiors. In tropical and temperate climates alike, uncalibrated sunlight can overwhelm interiors with heat and visual glare. Timeless architecture counters this through deep eaves, recessed pocket openings, and strategic light wells.

By introducing clerestory glazing and internal courtyards, rooms remain luminous throughout the day without requiring artificial illumination until after twilight. As the sun traverses the sky, shadows dance across microcement plaster, transforming the interior into an ever-changing canvas.

---

## 4. Proportion, Scale, and Spatial Flow

Mastering scale is what differentiates a collection of expensive furnishings from a truly cohesive architectural home. A cavernous double-height salon demands grounded, low-profile seating that establishes an intimate human scale within the volume.

1. **Establish Sightlines**: Position entrances so that upon entering, the gaze is guided toward an architectural focal point or a landscaped courtyard.
2. **Prioritize Circulation**: Maintain generous clearance (minimum 1.2 to 1.5 meters) along primary pathways to ensure effortless fluidity.
3. **Harmonize Heights**: Align door headers, window transoms, and continuous architectural reveals to foster subconscious visual calm.

---

## 5. Designing for Living, Not Just Staging

A house only becomes a home when it accommodates the unpredictability of daily life with elegance. Storage must be discreetly integrated behind seamless flush wall panels; acoustics must be cushioned to prevent echo; and intimate reading nooks must coexist harmoniously with expansive social gathering zones.

When you step into a home crafted with these principles, the immediate sensation is not one of museum sterility, but of profound, grounding peace.`,
    coverImage: '/images/blogs/creating-timeless-interiors.jpg',
    category: 'Interior Design',
    tags: ['Timeless Design', 'Quiet Luxury', 'Materiality', 'Residential Architecture'],
    author: 'Clara Delacroix',
    authorRole: 'Design Director',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    status: 'Published',
    publishedAt: '2026-10-24T09:00:00Z',
    updatedAt: '2026-10-25T14:30:00Z',
    seoTitle: 'Creating Timeless Interiors That Feel Like Home | Excorto Design',
    seoDesc: 'Explore how balanced proportions, honest materials, and natural daylight create enduring residential sanctuaries.',
    seoKeywords: 'timeless interiors, architectural design, luxury home interiors, Excorto builders',
    views: 3120,
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Structural Integrity in Modern Coastal & Tropical Home Construction',
    slug: 'structural-integrity-modern-home-construction-kerala',
    excerpt: 'Engineering resilient luxury residences that gracefully withstand heavy coastal monsoons and tropical microclimates.',
    content: `## 1. Building for Climate Resilience

Constructing a modern luxury residence in tropical and coastal environments demands an engineering philosophy fundamentally rooted in climate reality. Between torrential monsoons, high humidity, and saline sea winds, construction methods that suffice for temperate inland cities will rapidly deteriorate without specialized material science.

At Excorto Builders, structural longevity begins beneath the surface with precision soil stabilization, deep pile foundations, and non-porous subgrade waterproofing barriers.

---

## 2. Advanced Concrete Mixes & Corrosion Defense

Coastal air carries microscopic salt particles that penetrate standard porous concrete, causing internal steel rebar oxidation and structural spalling.

### Critical Engineering Safeguards:
- **Low-Water Cement Ratios with Silica Fume**: Greatly reduces capillary permeability within monolithic structural columns.
- **Fusion-Bonded Epoxy Coated Rebar**: Creates an impenetrable chemical barrier preventing chloride ion ingress.
- **Crystalline Waterproofing Admixtures**: Self-heals micro-fissures by forming insoluble needle-shaped crystals whenever moisture attempts to penetrate.

---

## 3. Passive Cross-Ventilation & Thermal Chimneys

Sustainable construction is not an afterthought; it is embedded in the home's primary massing. By incorporating internal open-sky courtyards, thermal chimneys draw warm rising air up and out, pulling cool ambient breezes through shaded ground-level verandahs.

This passive aerodynamic cooling reduces reliance on high-wattage air conditioning by over 40%, ensuring the home remains cool, fresh, and breathable throughout the most sweltering summer months.`,
    coverImage: '/images/blogs/home-construction.jpg',
    category: 'Home Construction',
    tags: ['Home Construction', 'Tropical Architecture', 'Engineering', 'Monsoon Resilience'],
    author: 'Julian Vance',
    authorRole: 'Principal Structural Engineer',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    status: 'Published',
    publishedAt: '2026-10-20T11:30:00Z',
    seoTitle: 'Structural Integrity in Modern Tropical Home Construction',
    seoDesc: 'Essential engineering techniques for constructing luxury residences in coastal and tropical climates.',
    seoKeywords: 'home construction Kerala, structural integrity, coastal villa construction',
    views: 2680,
    featured: true
  },
  {
    id: 'blog-3',
    title: 'Open-Plan Circulation: Mastering Residential Space Planning',
    slug: 'open-plan-circulation-mastering-residential-space-planning',
    excerpt: 'How sliding architectural screens, sunken salons, and purposeful zoning eliminate open-plan echo and clutter.',
    content: `## 1. The Paradox of the Open Plan

The vast, wall-free open concept promised boundless freedom, yet frequently resulted in cavernous spaces lacking acoustic intimacy, visual privacy, and purposeful orientation. 

Mastering contemporary space planning requires the art of *defined fluidity*—creating continuous sightlines while establishing unmistakable functional destinations within the broader envelope.

---

## 2. Architectural Pocket Partitions & Fluted Screens

Rather than relying on fixed drywall partitions, modern luxury homes employ ceiling-recessed fluted oak sliding panels. 

These screens can effortlessly transition a layout:
- Open the living pavilion completely for weekend hosting and grand gatherings.
- Slide closed into seamless pocket recesses to create an intimate fireside reading sanctuary or private study.

---

## 3. Floor Level Transitions: The Sunken Lounge

Subtle level shifts of 15 to 45 centimeters naturally zone living spaces without erecting visual barriers. A sunken conversational salon creates an inherent cocoon of intimacy, maintaining uninterrupted views out toward the surrounding gardens and reflection pools.`,
    coverImage: '/images/blogs/space-planning.jpg',
    category: 'Space Planning',
    tags: ['Space Planning', 'Open Plan', 'Sliding Screens', 'Circulation'],
    author: 'Elena Rostova',
    authorRole: 'Senior Interior Architect',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    status: 'Published',
    publishedAt: '2026-10-16T14:15:00Z',
    seoTitle: 'Mastering Residential Space Planning and Circulation',
    seoDesc: 'Learn architectural zoning techniques, fluted partitions, and sunken lounge principles.',
    seoKeywords: 'space planning, residential architecture, open plan interior design',
    views: 1940
  },
  {
    id: 'blog-4',
    title: 'Architectural Material Tactility: The Dialogue of Stone, Wood & Bronze',
    slug: 'architectural-material-tactility-stone-wood-bronze',
    excerpt: 'Selecting materials that age with dignity: exploring travertine textures, rift-sawn oak, and unlacquered hardware.',
    content: `## 1. Beyond Visual Aesthetics: The Senses of Architecture

Architecture is experienced not merely through the eyes, but through the fingertips, the sound of footsteps across solid timber, and the temperature of stone beneath bare feet on a warm morning.

When designing bespoke interiors, our studio curates materials that possess an intrinsic, unpretentious weight.

---

## 2. Hand-Honed Stone: Travertine & Earthen Limestone

Unlike high-gloss polished marble, honed and brushed travertine invites touch. Its micro-cavities tell geological stories spanning millennia. When paired with flush baseboards and concealed light reveals, stone becomes a monumental focal element.

---

## 3. Living Finishes: The Beauty of Natural Patina

A living finish is one that actively records the life lived within a home:
- Unlacquered brass doorknobs darken naturally where hands touch them most frequently.
- Oiled European oak floorboards develop richer tones where sunlight strikes them each season.

This dynamic aging process transforms a building from a static structure into a living family heirloom.`,
    coverImage: '/images/blogs/materials-finishes.jpg',
    category: 'Materials & Finishes',
    tags: ['Materials & Finishes', 'Natural Stone', 'Travertine', 'Joinery'],
    author: 'Clara Delacroix',
    authorRole: 'Design Director',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    status: 'Published',
    publishedAt: '2026-10-12T08:45:00Z',
    seoTitle: 'Architectural Material Tactility: Stone, Wood, and Bronze',
    seoDesc: 'Deep dive into authentic natural materials that age gracefully in luxury residences.',
    seoKeywords: 'architectural materials, travertine stone, living bronze finishes, white oak',
    views: 2210
  },
  {
    id: 'blog-5',
    title: 'Mastering Architectural Lighting: Indirect Cove & Sculptural Luminescence',
    slug: 'architectural-lighting-indirect-cove-and-luminescence',
    excerpt: 'Why layered lighting is the single most transformative investment in high-end residential interiors.',
    content: `## 1. Light as the Silent Sculptor

Light is the invisible architect of atmosphere. Without calibrated illumination, even the most exquisite marble and millwork fall flat. In our studio practice, we never rely on solitary center ceiling fixtures.

Instead, we layer illumination across three discrete strata:
1. **Architectural Ambient**: Concealed plaster cove illumination delivering soft, shadowless perimeter radiance.
2. **Focal Accent**: Narrow-beam museum-grade spotlights (95+ CRI) highlighting artwork, sculptural pottery, and textured stonework.
3. **Task & Intimate**: Low-level table lamps with hand-spun ceramic bases and linen shades for evening warmth.

---

## 2. Circadian Warm-Dimming Technologies

Modern biological wellness requires lighting that shifts color temperature naturally across the 24-hour cycle. We integrate warm-dim LED modules that automatically transition from crisp 3000K daylight into warm 2200K candlelight as night falls, preserving melatonin production and fostering deep evening relaxation.`,
    coverImage: '/images/blogs/lighting-mastery.jpg',
    category: 'Tips & Guides',
    tags: ['Lighting Design', 'Tips & Guides', 'Warm Dimming', 'Cove Lighting'],
    author: 'Julian Vance',
    authorRole: 'Senior Architect',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    readTime: '7 min read',
    status: 'Published',
    publishedAt: '2026-10-08T16:00:00Z',
    seoTitle: 'Mastering Architectural Lighting: Indirect Cove and Ambience',
    seoDesc: 'A comprehensive guide to residential lighting strata, warm dimming, and cove illumination.',
    seoKeywords: 'architectural lighting, cove lighting, interior illumination tips, Excorto',
    views: 3450,
    featured: true
  },
  {
    id: 'blog-6',
    title: 'The Quiet Luxury Palette: Textural Neutrals & Raw Earth Pigments',
    slug: 'the-quiet-luxury-palette-textural-neutrals',
    excerpt: 'How subdued tones, natural lime plasters, and tactile textiles create enduring, tranquil sanctuaries.',
    content: `## 1. Serenity in Restraint

In the contemporary era of hyper-sensory visual noise, luxury has abandoned flamboyant ornamentation in favor of profound serenity. High-end interior architecture is now defined by the delicate orchestration of textural nuance.

From raw travertine to unlacquered brass and heavy Belgian linens, the quiet luxury aesthetic honors authentic materials that patina gracefully with age. When designing private residences, we calibrate natural light to accentuate subtle tactile shadows across artisanal microcement and hand-troweled lime wash.

---

## 2. The Power of Monochromatic Layering

Monochromatic does not mean sterile white. It means curating five distinct tones of oat, chalk, sand, and coffee brown, expressed across varied textures:
- Fluted plaster wall details
- Bouclé accent chairs
- Hand-knotted unbleached wool carpets
- Raw-edge walnut coffee tables`,
    coverImage: '/images/blogs/trends-2026.jpg',
    category: 'Interior Design',
    tags: ['Quiet Luxury', 'Interior Design', 'Neutral Palettes', 'Minimalism'],
    author: 'Clara Delacroix',
    authorRole: 'Design Director',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    status: 'Published',
    publishedAt: '2026-10-02T10:00:00Z',
    seoTitle: 'The Quiet Luxury Palette in Interior Architecture',
    seoDesc: 'Discover how textural neutrals and raw earth pigments form tranquil luxury sanctuaries.',
    seoKeywords: 'quiet luxury, neutral color palette, architectural interior design',
    views: 1840
  },
  {
    id: 'blog-7',
    title: 'Culinary Architecture: Designing the Sculptural Show Kitchen',
    slug: 'culinary-architecture-sculptural-show-kitchen',
    excerpt: 'The convergence of professional-grade culinary mechanics and gallery-level marble stonework.',
    content: `## 1. The Evolution of the Kitchen

The modern kitchen has evolved from a concealed service corridor into the majestic heart of social living. Today's premier residences demand a dual-zone design: an aesthetic show kitchen for entertaining and an adjacent back scullery for rigorous preparation.

Waterfall marble blocks, seamlessly flush pocket doors, and recessed ambient LED tracks create an uninterrupted architectural envelope. By integrating touch-to-open refrigeration and downdraft induction, the kitchen presents as an exquisite sculptural monolith when not in active culinary use.`,
    coverImage: '/images/blogs/sustainable-materials.jpg',
    category: 'Space Planning',
    tags: ['Kitchen Design', 'Space Planning', 'Marble Island', 'Culinary Architecture'],
    author: 'Julian Vance',
    authorRole: 'Senior Architect',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    status: 'Published',
    publishedAt: '2026-09-25T13:20:00Z',
    seoTitle: 'Culinary Architecture: Designing the Sculptural Show Kitchen',
    seoDesc: 'Explore dual-zone kitchen design, waterfall marble islands, and integrated appliance concealment.',
    seoKeywords: 'culinary architecture, luxury kitchen design, show kitchen island',
    views: 2410
  },
  {
    id: 'blog-8',
    title: 'Biophilic Residential Sanctuaries: Living in Harmony with Nature',
    slug: 'biophilic-residential-sanctuaries-living-with-nature',
    excerpt: 'Integrating internal botanical courtyards, reflection pools, and cross-ventilation in modern homes.',
    content: `## 1. Nature as an Inherent Architectural Component

Biophilic design is far more than scattering potted plants across a room; it is the deliberate architectural integration of natural systems into the domestic routine.

By introducing central open-sky courtyards, rainwater reflection channels, and floor-to-ceiling glass pavilions that frame native foliage, homeowners experience reduced stress, improved circadian rhythm, and enhanced mental clarity every single day.`,
    coverImage: '/images/blogs/biophilic-design.jpg',
    category: 'Home Construction',
    tags: ['Biophilic Design', 'Home Construction', 'Courtyard Houses', 'Green Living'],
    author: 'Elena Rostova',
    authorRole: 'Senior Interior Architect',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    status: 'Published',
    publishedAt: '2026-09-18T10:10:00Z',
    seoTitle: 'Biophilic Residential Sanctuaries | Excorto Builders',
    seoDesc: 'How internal reflection pools and botanical courtyards transform modern luxury homes.',
    seoKeywords: 'biophilic architecture, courtyard residences, eco luxury homes',
    views: 1980
  }
];

// Seed Newsletter Subscribers
export const initialNewsletterSubscribers: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'elena.rostova@designatelier.com', subscribedAt: '2026-10-20T10:15:00Z', status: 'Active' },
  { id: 'sub-2', email: 'marcus.vance@tribecahomes.io', subscribedAt: '2026-10-18T14:30:00Z', status: 'Active' },
  { id: 'sub-3', email: 'priya.nair@kowdiarvilla.org', subscribedAt: '2026-10-15T09:45:00Z', status: 'Active' },
  { id: 'sub-4', email: 'sunil.menon@varkalacoastal.in', subscribedAt: '2026-10-12T16:20:00Z', status: 'Active' },
  { id: 'sub-5', email: 'ananya.kurup@jawaharnagar.in', subscribedAt: '2026-10-08T11:00:00Z', status: 'Active' }
];

// Seed Testimonials
export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Lord Alistair & Lady Cynthia Thorne',
    clientRole: 'Homeowner, Bel Air Residence',
    clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'LUMEN transformed our California residence into an architectural masterpiece. Their mastery over spatial balance, custom oak paneling, and discreet lighting exceeded our highest expectations.',
    rating: 5,
    projectTitle: 'The Bel Air Minimalist Pavilion',
    status: 'Approved',
    featured: true,
    createdAt: '2026-10-18T14:20:00Z'
  },
  {
    id: 'test-2',
    clientName: 'Harrison Sterling',
    clientRole: 'Managing Partner, Apex Capital',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'The executive lounge and boardroom they crafted for our Hudson Yards headquarters has set a new benchmark in our industry. Clients are awed the instant they step through the reeded glass entry.',
    rating: 5,
    projectTitle: 'Venture Capital Headquarters',
    status: 'Approved',
    featured: true,
    createdAt: '2026-10-12T09:45:00Z'
  },
  {
    id: 'test-3',
    clientName: 'Camila Rodriguez',
    clientRole: 'Private Investor, Miami Penthouse',
    clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'From the initial hand sketches to the installation of the raw-edge dining slab, every interaction was pure professionalism. The space feels both gallery-level magnificent and wonderfully intimate.',
    rating: 5,
    projectTitle: 'Skyline Penthouse Salon',
    status: 'Approved',
    featured: true,
    createdAt: '2026-10-04T16:10:00Z'
  },
  {
    id: 'test-4',
    clientName: 'Dr. Evelyn & Marcus Vance',
    clientRole: 'Tribeca Loft Owner',
    clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'The kitchen waterfall island is literally a work of art. Cooking and hosting friends here has completely redefined our lifestyle. Truly world-class designers.',
    rating: 5,
    projectTitle: 'Tribeca Culinary Atelier',
    status: 'Approved',
    featured: false,
    createdAt: '2026-09-29T11:30:00Z'
  },
  {
    id: 'test-5',
    clientName: 'Dr. Arun & Priya Nair',
    clientRole: 'Homeowner, Kowdiar Villa',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    quote: 'From structural redesign to bespoke teak joinery, Excorto delivered far beyond our imaginations. The internal open courtyards and lighting make our home a sanctuary.',
    rating: 5,
    projectTitle: 'Kowdiar Courtyard Residence',
    status: 'Approved',
    featured: true,
    createdAt: '2026-09-22T10:15:00Z'
  },
  {
    id: 'test-6',
    clientName: 'Sunil & Meera Menon',
    clientRole: 'Homeowners, Varkala Cliff',
    clientPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    quote: 'Living in a home designed by Excorto is an everyday joy. They understood coastal microclimates, cross-ventilation, and modern minimalist luxury with complete clarity.',
    rating: 5,
    projectTitle: 'Waterfront Cliff Villa',
    status: 'Approved',
    featured: true,
    createdAt: '2026-09-15T14:40:00Z'
  },
  {
    id: 'test-7',
    clientName: 'Rahul & Ananya Kurup',
    clientRole: 'Penthouse Owners, Jawahar Nagar',
    clientPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    quote: 'The double-height living room and seamless indoor-outdoor balcony flow are breathtaking. Their craftsmanship and transparent timeline management made it effortless.',
    rating: 5,
    projectTitle: 'Jawahar Nagar Skyline Duplex',
    status: 'Approved',
    featured: false,
    createdAt: '2026-09-08T11:20:00Z'
  },
  {
    id: 'test-8',
    clientName: 'Anand & Shilpa Varma',
    clientRole: 'Restoration Clients, Fort Kochi',
    clientPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    quote: 'Excorto gracefully merged traditional Kerala vernacular elements with crisp modern lines. The lime-plaster walls and shaded verandahs are pure poetry.',
    rating: 5,
    projectTitle: 'Heritage Modern Residence',
    status: 'Approved',
    featured: true,
    createdAt: '2026-08-30T16:00:00Z'
  },
  {
    id: 'test-9',
    clientName: 'Vikramaditya Sen',
    clientRole: 'Founder, Studio Axis Bangalore',
    clientPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    quote: 'Their turnkey project management removed every ounce of stress from our construction. On schedule, on budget, and immaculate finishing throughout.',
    rating: 5,
    projectTitle: 'Creative Innovation Atelier',
    status: 'Approved',
    featured: false,
    createdAt: '2026-08-20T09:30:00Z'
  },
  {
    id: 'test-10',
    clientName: 'George & Mary Thomas',
    clientRole: 'Villa Owners, Kumarakom',
    clientPhoto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    quote: 'The calm serenity of our living spaces owes everything to Excorto\'s sensibility with natural stone, warm wood, and filtered daylight. Exceptional execution.',
    rating: 5,
    projectTitle: 'Backwater Lakeview Haven',
    status: 'Approved',
    featured: true,
    createdAt: '2026-08-12T13:45:00Z'
  }
];

// Seed Enquiries
export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    clientName: 'Sophia Montgomery',
    email: 'sophia.montgomery@vanderbilt.com',
    phone: '+1 (415) 890-3321',
    service: 'Full Home Architecture & Interior',
    budget: '$300,000 - $500,000',
    timeline: 'Within 6 months',
    message: 'We recently acquired a 7,200 sq ft waterfront property in Pacific Palisades. Seeking LUMEN to lead full gut renovation, architectural millwork, and bespoke furniture procurement.',
    status: 'New',
    notes: 'High priority VIP client referred by Harrison Sterling.',
    assignedTo: 'Clara Delacroix',
    createdAt: '2026-10-23T08:15:00Z'
  },
  {
    id: 'enq-102',
    clientName: 'Jonathan Hayes',
    email: 'jhayes@meridianholdings.io',
    phone: '+1 (212) 642-9904',
    service: 'Commercial Office Redesign',
    budget: '$500,000+',
    timeline: '3 - 4 months',
    message: 'Looking for a comprehensive spatial redesign of our 9,500 sq ft executive suite in Midtown Manhattan. Need acoustic glass partitions, biophilic greenery, and boardroom audio-visual integration.',
    status: 'In Progress',
    notes: 'Initial site walkthrough scheduled for Tuesday 2 PM.',
    assignedTo: 'Elena Rostova',
    createdAt: '2026-10-22T14:40:00Z'
  },
  {
    id: 'enq-103',
    clientName: 'Beatrice Van Der Bilt',
    email: 'b.vanderbilt@sohoarts.org',
    phone: '+1 (310) 774-1290',
    service: 'Luxury Penthouse Living & Dining',
    budget: '$150,000 - $250,000',
    timeline: 'Flexible',
    message: 'We want to reimagine our Upper East Side penthouse living salon with warm minimalist oak finishes, sculptural stone, and museum-grade art illumination.',
    status: 'Contacted',
    notes: 'Sent initial portfolio lookbook and questionnaire.',
    assignedTo: 'Julian Vance',
    createdAt: '2026-10-21T11:20:00Z'
  },
  {
    id: 'enq-104',
    clientName: 'Alexander Zhang',
    email: 'alex.zhang@apextech.co',
    phone: '+1 (206) 555-8834',
    service: 'Kitchen & Dining Remodel',
    budget: '$100,000 - $150,000',
    timeline: 'Immediate',
    message: 'Seeking a Calacatta marble waterfall island and fluted smoked oak cabinetry similar to your Tribeca project.',
    status: 'Proposal Sent',
    notes: 'Proposal #2026-088 delivered via DocuSign.',
    assignedTo: 'Clara Delacroix',
    createdAt: '2026-10-19T16:05:00Z'
  },
  {
    id: 'enq-105',
    clientName: 'Claire & David Beaumont',
    email: 'beaumont.claire@gmail.com',
    phone: '+1 (305) 902-4411',
    service: 'Serene Master Suite & Spa Bath',
    budget: '$80,000 - $120,000',
    timeline: 'Next 2 months',
    message: 'Looking to turn our Coral Gables master bedroom and bathroom into a five-star boutique hotel retreat.',
    status: 'Converted',
    notes: 'Retainer deposit received. Project kickoff signed!',
    assignedTo: 'Clara Delacroix',
    createdAt: '2026-10-15T10:15:00Z'
  }
];

export const initialSiteSettings: SiteSetting = {
  studioName: 'EXCORTO Builders & Interiors',
  tagline: 'Architectural Thinking & Interior Creativity',
  contactEmail: 'contact@excortobuilders.com',
  contactPhone: '+91 98470 12345',
  address: 'TC 15/1982, Kowdiar Main Avenue, Thiruvananthapuram, Kerala 695003',
  instagram: 'https://instagram.com/excorto.interiors',
  linkedin: 'https://linkedin.com/company/excorto-builders',
  defaultCurrency: 'INR (₹)',
  autoNotifyEnquiries: true,
  featuredNotice: 'Currently accepting commissions for luxury residences, penthouses, and bespoke interiors in Kerala.'
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'Architectural Design',
    slug: 'architectural-design',
    shortDescription: 'Thoughtful architectural planning and consultation, creating functional, aesthetically balanced spaces that respond to your requirements and project vision.',
    fullDescription: 'Excorto Builders & Interiors provides comprehensive architectural design services for residential and commercial projects. Our architectural methodology blends contextual sensitivity with modern spatial planning, ensuring structural elegance, passive environmental balance, and enduring material integrity.',
    heroImage: '/images/services/arch-card.jpg',
    additionalImages: ['/images/services/arch-card.jpg', '/images/Warm Modern Living Retreat.png'],
    deliverables: [
      'Conceptual Masterplans & Site Planning',
      '3D Photorealistic Exterior & Interior Visualizations',
      'Complete Architectural & Structural Blueprints',
      'Statutory Approvals & Liaisoning',
      'Periodic Site Supervision & Milestone Handover'
    ],
    features: [
      'Contextual Environmental Orientation',
      'Natural Ventilation & Daylight Optimization',
      'Modern Tropical Architectural Idiom',
      'End-to-End Milestone Tracking'
    ],
    displayOrder: 1,
    status: 'Published',
    seoTitle: 'Architectural Design | Excorto Builders & Interiors',
    seoDesc: 'Bespoke architectural planning, site analysis, and construction blueprints in Kerala.',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'Interior Designing',
    slug: 'interior-designing',
    shortDescription: 'Personalized interior concepts combining space planning, materials, colours, lighting and design details to create beautiful and functional environments.',
    fullDescription: 'Our interior design atelier curates refined living atmospheres tailored to your lifestyle. We harmonize tactile natural materials, custom woodwork, ambient architectural illumination, and timeless ergonomic spatial layouts.',
    heroImage: '/images/services/interior-card.jpg',
    additionalImages: ['/images/services/interior-card.jpg', '/images/about-clean-interior-sketch-v2.jpg'],
    deliverables: [
      'Custom Joinery & Cabinetry Schematics',
      'Lighting & False Ceiling Detailed Layouts',
      'Material, Stone & Textile Swatches',
      'Color Palette Direction & Mood Boards',
      'Bespoke Furniture Procurement & Curation'
    ],
    features: [
      'Quiet Luxury Aesthetic & Tactile Finishes',
      'Artisanal Woodwork & Stone Detailing',
      'Ergonomic Kitchen & Living Space Optimization',
      'Seamless Visual Harmony'
    ],
    displayOrder: 2,
    status: 'Published',
    seoTitle: 'Interior Designing | Excorto Builders & Interiors',
    seoDesc: 'Luxury residential and commercial interior architecture and styling in Kerala.',
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'Interior Installation',
    slug: 'interior-installation',
    shortDescription: 'Careful installation of approved interior elements, with attention to alignment, coordination, materials, detailing and finishing.',
    fullDescription: 'From modular kitchens and custom wardrobes to acoustic ceiling paneling and architectural lighting fixtures, our experienced master craftsmen execute every installation with pinpoint precision and uncompromising quality.',
    heroImage: '/images/services/install-card.jpg',
    additionalImages: ['/images/services/install-card.jpg', '/images/projects/kitchen.jpg'],
    deliverables: [
      'Precision Modular Kitchen Fitting',
      'Custom Wardrobes & Vanity Execution',
      'Acoustic Wall Paneling & Partitions',
      'Electrical & Ambient Lighting Fixture Fitting',
      'Multi-Point Quality Assurance & Handover'
    ],
    features: [
      'Strict Dimensional Tolerances',
      'Premium European Hardware (Blum / Häfele)',
      'Dust-Controlled On-Site Execution',
      'Comprehensive Finish Inspection'
    ],
    displayOrder: 3,
    status: 'Published',
    seoTitle: 'Interior Installation | Excorto Builders & Interiors',
    seoDesc: 'Precision installation of custom joinery, modular kitchens, and bespoke finishes in Kerala.',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'Design Consultation',
    slug: 'consultation',
    shortDescription: 'Start with a conversation. Discuss your requirements, project possibilities, planning considerations and the right direction for your space.',
    fullDescription: 'Schedule a direct one-on-one consultation with our principal architects and interior specialists. We analyze your site or floor plan, review lifestyle aspirations, establish feasible budgets, and outline clear roadmap phases.',
    heroImage: '/images/services/consult-card.jpg',
    additionalImages: ['/images/services/consult-card.jpg'],
    deliverables: [
      'Site Feasibility & Space Assessment',
      'Budgetary & Material Roadmap Formulation',
      'Preliminary Space Distribution Sketches',
      'Project Phasing & Timeline Advice'
    ],
    features: [
      'In-Person Studio or Virtual Meeting',
      'Direct Interaction with Senior Architects',
      'Transparent Financial Planning',
      'Clear Next Steps'
    ],
    displayOrder: 4,
    status: 'Published',
    seoTitle: 'Architectural & Interior Consultation | Excorto Builders',
    seoDesc: 'Schedule a discovery session with Excorto architects in Thiruvananthapuram, Kerala.',
    createdAt: '2026-01-18T10:00:00Z'
  }
];

export const initialPageContent: PageContent = {
  home: {
    heroEyebrow: 'SPACES THAT FEEL LIKE YOU',
    heroHeadlineLine1: 'Thoughtfully',
    heroHeadlineLine2: 'Designed.',
    heroHeadlineHighlight: 'Beautifully Executed.',
    heroDescription: 'Architecture and interiors designed with intent, crafted with care, and built to endure across generations.',
    heroImageDesktop: '/images/AA4DD01B-86D5-45F3-991A-BC3AD98FE52B.png',
    heroImageMobile: '/images/Sunlit Arched Nook with Olive Branches.png',
    heroCtaText: 'START A CONVERSATION',
    aboutEyebrow: 'ABOUT EXCORTO',
    aboutHeadline: 'Designing Spaces. Shaping Experiences.',
    aboutDescription1: 'A great space is more than what you see. It is how naturally it functions, how comfortably it feels, and how meaningfully it connects with the people who use it.',
    aboutDescription2: 'At Excorto Builders & Interiors, we bring together architectural thinking and interior creativity to create environments that balance aesthetics with functionality.',
    aboutDescription3: 'Every project is unique. We value personalized design, careful planning, suitable material selection, and clear communication throughout the process.',
    aboutCtaText: 'MORE ABOUT US'
  },
  about: {
    heroTitle: 'Rooted in Context, Driven by Craft.',
    heroSubtitle: 'EXCORTO is an architectural and interior design studio committed to crafting functional, timeless sanctuaries.',
    heroImage: '/images/about-living.jpg',
    storyHeadline: 'Spaces Built with Human Centered Warmth',
    storyParagraph1: 'Founded in Kerala, EXCORTO Builders & Interiors brings together multidisciplinary architects, spatial designers, and skilled construction specialists.',
    storyParagraph2: 'Our studio believes that architectural design should honor its natural landscape while serving the daily rituals of those who dwell within it.'
  },
  contact: {
    heading: "Let's build something extraordinary together.",
    subheading: 'DIRECT ENQUIRIES',
    description: 'Every project begins with a conversation. Visit our architectural studio in Thiruvananthapuram or fill out the enquiry form to schedule your initial consultation.',
    email: 'contact@excortobuilders.com',
    phone: '+91 98470 12345',
    address: 'TC 15/1982, Kowdiar Main Avenue, Thiruvananthapuram, Kerala 695003',
    businessHours: 'Monday – Saturday: 9:00 AM – 6:30 PM',
    mapsUrl: 'https://maps.google.com/?q=Kowdiar+Thiruvananthapuram'
  }
};

export const initialDashboardStats: DashboardStats = {
  totalProjects: 48,
  activeProjects: 12,
  publishedBlogs: 24,
  draftBlogs: 6,
  newEnquiries: 38,
  totalEnquiries: 142,
  conversionRate: 34.2,
  averageRating: 4.96,
  totalTestimonials: 52,
  trends: {
    projects: '+14.5%',
    blogs: '+8.2%',
    enquiries: '+23.8%',
    testimonials: '+100%'
  },
  chartData: {
    '7d': [
      { date: 'Mon', enquiries: 4, consultations: 2 },
      { date: 'Tue', enquiries: 7, consultations: 5 },
      { date: 'Wed', enquiries: 5, consultations: 3 },
      { date: 'Thu', enquiries: 9, consultations: 6 },
      { date: 'Fri', enquiries: 12, consultations: 8 },
      { date: 'Sat', enquiries: 6, consultations: 4 },
      { date: 'Sun', enquiries: 8, consultations: 5 }
    ],
    '30d': [
      { date: 'Week 1', enquiries: 24, consultations: 16 },
      { date: 'Week 2', enquiries: 32, consultations: 22 },
      { date: 'Week 3', enquiries: 29, consultations: 19 },
      { date: 'Week 4', enquiries: 45, consultations: 31 }
    ],
    '90d': [
      { date: 'Aug', enquiries: 84, consultations: 56 },
      { date: 'Sep', enquiries: 112, consultations: 74 },
      { date: 'Oct', enquiries: 142, consultations: 98 }
    ]
  }
};

