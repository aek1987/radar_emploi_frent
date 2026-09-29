export interface JobOffer {
  source: string;
  title: string;
  company: string;
  url: string;
  tags: string[];
  score: number;
  competences_manquantes: string[];
  points_forts: string[];
  lettre: string;
}

export interface JobsResponse {
  updated_at: string | null;
  keyword: string;
  min_score: number;
  total_analysees: number;
  offres: JobOffer[];
}

export type JobStatus = 'pass' | 'warn' | 'fail';
