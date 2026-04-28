export interface GaleriItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  videoUrl?: string;
  photos: string[];
  participants: string;
  objective: string;
}
