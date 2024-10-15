export interface Post {
  _id: string;
  photo: string;
  post: string;
  createdAt: string;
  favorites: string[];
  likes: string[];
  publicId: string;
  ratings: number;
  reviews: Review[];
  totalReviews: number;
  totalViews: number;
  updatedAt: string;
  user: string;
}

export interface Review {
  comment: string;
  rating: number;
  user: string;
  username: string;
  _id: string;
}