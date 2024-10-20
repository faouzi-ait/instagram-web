import { Post } from './types';

export function removeDuplicates<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set();

  return arr?.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) return false;

    seen.add(keyValue);
    return true;
  });
}

export const isOwnerPost = (data: Post, userId: string) =>
  data?.user === userId;
export const isLiked = (post: Post, userId: string) =>
  post?.likes?.includes(userId);
export const isFavorites = (post: Post, userId: string) =>
  post?.favorites?.includes(userId);
export const hasReview = (post: Post, userId: string) =>
  post?.reviews?.some((el) => el.user === userId);
