export interface ForumPost {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category: string;
  votes: number;
  created_at: string;
}

export interface ForumComment {
  id: string;
  content: string;
  post_id: string;
  user_id: string;
  votes: number;
  created_at: string;
}

export type Category = 'general' | 'music' | 'events' | 'tech' | 'culture';