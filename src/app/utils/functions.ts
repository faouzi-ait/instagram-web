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

export const formattedDate = (post: Post) =>
  new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const iconDisplay = (iconPrefix: string, condition: boolean): any => {
  const suffix = condition ? 'Full' : 'Empty';
  return iconPrefix + suffix;
};

export const inputFields = (fileInputRef: any) => {
  return [
    { name: 'firstname', placeholder: 'Your firstname', required: true },
    { name: 'lastname', placeholder: 'Your lastname', required: true },
    { name: 'phone', placeholder: 'Your phone', required: true },
    { name: 'username', placeholder: 'Your username', required: true },
    {
      name: 'password',
      placeholder: 'Your password',
      type: 'password',
      required: true,
    },
    { name: 'photo', type: 'file', ref: fileInputRef },
  ];
};

export const updateInputFields = [
  { name: 'firstname', placeholder: 'Your firstname', required: true },
  { name: 'lastname', placeholder: 'Your lastname', required: true },
  { name: 'phone', placeholder: 'Your phone', required: true },
];
