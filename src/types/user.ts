export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export interface Comment {
  rating: number;
  comment: string;
}
