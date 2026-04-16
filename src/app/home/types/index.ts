// ============================================================================
// HERO SECTION TYPES
// ============================================================================

export interface HeroStat {
  label: string
  value: string
}

export interface CTAButton {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  icon?: 'arrow' // only for primary
}

export interface HeroSectionContent {
  badge: string
  titleLines: [string, string, string]
  description: string
  cta: CTAButton[]
  stats: HeroStat[]
}

// ============================================================================
// DEMOGRAFIS SECTION TYPES
// ============================================================================

export interface DemografiStat {
  angka: string
  label: string
  detail: string
}

export interface DemografiSectionContent {
  heading: string
  description: string
  stats: DemografiStat[]
}

// ============================================================================
// APBDES SECTION TYPES
// ============================================================================

export interface APBDesStatistic {
  label: string
  value: string
}

export interface APBDesYear {
  year: number
  description?: string
}

export interface APBDesSectionContent {
  heading: string
  description: string
  years: APBDesYear[]
  statistics: APBDesStatistic[]
}

// ============================================================================
// LEADERSHIP SECTION TYPES
// ============================================================================

export interface LeadershipSectionContent {
  heading: string
  description: string
  name: string
  role: string
  bio: string
  ctaLink: string
  ctaLabel: string
}

// ============================================================================
// STRUKTUR SECTION TYPES
// ============================================================================

export interface StrukturPosition {
  jabatan: string
  nama: string
  image: string
  alt: string
  delay?: number
  widthClass?: string
  hoverWidthClass?: string
}

export interface StrukturSectionContent {
  heading: string
  description: string
  ctaLink: string
  ctaLabel: string
  positions: StrukturPosition[]
}

// ============================================================================
// NEWS SECTION TYPES
// ============================================================================

export interface NewsCard {
  title: string
  description: string
  image?: string
  icon?: string
}

export interface NewsSectionContent {
  heading: string
  description: string
  cards: NewsCard[]
}

// ============================================================================
// STATCARD UI COMPONENT TYPES
// ============================================================================

export interface StatCardProps {
  angka: string
  label: string
  detail: string
  delay?: number
  className?: string
}

// ============================================================================
// NEWSCARD UI COMPONENT TYPES
// ============================================================================

export interface NewsCardProps {
  title: string
  description: string
  image?: string
  icon?: string
  className?: string
  delay?: number
}
