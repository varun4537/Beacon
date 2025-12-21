
export interface NewsStory {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceTitle: string;
  category: string;
  publishedAt: string;
  region?: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export enum NewsCategory {
  LATEST = 'Latest Feed',
  INDIA = 'India',
  ASIA = 'Asia',
  WORLD = 'Global',
  ENVIRONMENT = 'Environment',
  SCIENCE = 'Science & Tech',
  HUMANITY = 'Human Interest'
}

export interface NewsResponse {
  stories: NewsStory[];
  rawText: string;
  sources: GroundingSource[];
}
