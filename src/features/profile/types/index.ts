export interface GovernmentMember {
  name: string;
  position: string;
  photo?: string;
}

export interface Facility {
  name: string;
  type: string;
  location: string;
  description: string;
}

export interface VillageProfile {
  name: string;
  slogan: string;
  establishedYear: string;
  vision: string;
  mission: string[];
  history: string;
  governance: GovernmentMember[];
  facilities: Facility[];
}
