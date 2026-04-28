export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: NewsCategory;
  author: Author;
  publishedAt: string;
  readingTime: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}
