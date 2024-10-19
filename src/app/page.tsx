'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';

import PostCard from './components/card';
import Button from './components/button';
import ThemeToggle from './components/ThemeToggle';

import { setLogout } from '../redux/slices/authSlice';
import { removeDuplicates } from './utils/functions';
import { Post } from './utils/types';

// import styles from './page.module.css';

export default function Home() {
  const { isLoggedIn } = useSelector((item: RootState) => item.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [size] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
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

  const logout = async () => {
    dispatch(setLogout());
  };

  const uniquePosts = removeDuplicates(posts, '_id');

  return (
    <div>
      <h1>This is the home page</h1>

      <ThemeToggle />

      {isLoggedIn && (
        <Button onClick={logout} variant='secondary' size='medium'>
          {/* <FontAwesomeIcon icon={faArrowsLeftRightToLine} /> <br /> */}{' '}
          logout
        </Button>
      )}

      {!isLoggedIn && (
        <Button
          onClick={() => router.push('/login')}
          variant='secondary'
          size='medium'
        >
          {/* <FontAwesomeIcon icon={faRightToBracket} /> <br /> */}
          login
        </Button>
      )}

      <div style={{ width: '35%' }}>
        {uniquePosts.map((post: Post) => (
          <PostCard key={post._id} post={post} loading={isLoading} />
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
