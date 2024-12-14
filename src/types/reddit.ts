export interface RedditPost {
  title: string;
  selftext: string;
  author: string;
  score: number;
  created_utc: number;
  num_comments: number;
}

export interface RedditComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  replies?: {
    data?: {
      children: Array<{ data: RedditComment }>;
    };
  };
}