export interface PotensiStats {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface PotensiDetailTable {
  subCategory: string;
  amount: string;
  production: string;
  location: string;
  group: string;
}

export interface PotensiItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  gallery: string[];
  highlights: {
    label: string;
    value: string;
  }[];
  details: PotensiDetailTable[];
  investmentInfo: string;
  accessInfo: string;
}
