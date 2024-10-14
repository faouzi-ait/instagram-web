'use client';

import { useState, useEffect } from 'react';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';

import PostCard from './components/card';
import Button from './components/button';
import ThemeToggle from './components/ThemeToggle';

import { removeDuplicates } from './utils/functions';

import styles from './page.module.css';

interface Post {
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

interface Review {
  comment: string;
  rating: number;
  user: string;
  username: string;
  _id: string;
}

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(2);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, error, isLoading, refetch } = useGetPostsQuery({
    searchTerm: '',
    pageSize: size,
    page,
  });

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data.items]);
      if (data.items.length < size) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMorePosts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const uniquePosts = removeDuplicates(posts, '_id');

  return (
    <div>
      <h1>This is the home page</h1>
      <ThemeToggle />

      <div>
        {uniquePosts.map((post: Post, i) => (
          <PostCard
            key={post._id}
            post={post.post}
            photo={post.photo}
            createdAt={post.createdAt}
            isLoading={isLoading}
          />
        ))}
      </div>

      {hasMore && (
        <Button onClick={loadMorePosts} variant='secondary' size='medium'>
          {!isLoading ? 'Load More' : 'Loading posts...'}
        </Button>
      )}

      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
}
