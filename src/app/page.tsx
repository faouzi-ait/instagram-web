'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';

import PostCard from './components/card';
import Button from './components/button';
import ThemeToggle from './components/ThemeToggle';

import { removeDuplicates } from './utils/functions';
import { Post } from './utils/types';

// import styles from './page.module.css';

export default function Home() {
  const selector = useSelector((item: RootState) => item.auth);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(2);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, /*error,*/ isLoading /*, refetch*/ } = useGetPostsQuery({
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
  }, [data, size]);

  const loadMorePosts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const uniquePosts = removeDuplicates(posts, '_id');

  return (
    <div>
      <h1>This is the home page</h1>
      <ThemeToggle />

      <div>
        {uniquePosts.map((post: Post) => (
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
