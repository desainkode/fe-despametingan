// ============================================================================
// TAB & HERO TYPES (from existing config)
// ============================================================================

export type InfografisKey =
  | 'penduduk'
  | 'apbdes'
  | 'stunting'
  | 'bansos'
  | 'idm'
  | 'sdgs'

export interface InfografisTab {
  key: InfografisKey
  label: string
}

export interface HeroContent {
  eyebrow: string
  titleLines: [string, string, string]
  description: string
  stats: Array<{
    label: string
    value: string
  }>
  quoteName: string
  quoteRole: string
  quoteText: string
}

// ============================================================================
// PENDUDUK/DEMOGRAFI SECTION TYPES
// ============================================================================

export interface DemografiCard {
  label: string
  value: string
  unit: string
  icon: string
}

export interface PendudukSectionContent {
  title: string
  description: string
  cards: DemografiCard[]
}

// ============================================================================
// APBDES SECTION TYPES
// ============================================================================

export interface ApbdesStatistic {
  label: string
  value: string
}

export interface ApbdesSectionContent {
  title: string
  description: string
  statistics: ApbdesStatistic[]
}

// ============================================================================
// BANSOS SECTION TYPES
// ============================================================================

export interface BansosStatus {
  label: string
  value: string
}

export interface BansosSectionContent {
  title: string
  description: string
  statuses: BansosStatus[]
}

// ============================================================================
// STUNTING SECTION TYPES
// ============================================================================

export interface StuntingIndicator {
  label: string
  value: string
  description: string
}

export interface StuntingSectionContent {
  title: string
  description: string
  indicators: StuntingIndicator[]
}

// ============================================================================
// IDM SECTION TYPES
// ============================================================================

export interface IdmIndicator {
  label: string
  value: string
}

export interface IdmSectionContent {
  title: string
  description: string
  indicators: IdmIndicator[]
}

// ============================================================================
// SDGS SECTION TYPES
// ============================================================================

export interface SdgsIndicator {
  label: string
  value: string
}

export interface SdgsSectionContent {
  title: string
  description: string
  indicators: SdgsIndicator[]
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export interface TabButtonProps {
  item: InfografisTab
  active: boolean
  onClick: (key: InfografisKey) => void
}

export interface DemografiCardProps {
  label: string
  value: string
  unit: string
  icon: string
}

export interface SectionHeaderProps {
  title: string
  description: string
}

export interface StatPillProps {
  label: string
  value: string
}

export interface MiniMetricProps {
  label: string
  value: string
}
