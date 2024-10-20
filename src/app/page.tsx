'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';
import {
  useGetUserPhotoQuery,
  useGetUserQuery,
} from '../redux/apiServices/authApi';
import { currentUser } from '../redux/slices/selectors';

import PostCard from './components/card';
import Button from './components/button';
import ThemeToggle from './components/ThemeToggle';

import { setLogout } from '../redux/slices/authSlice';
import { removeDuplicates } from './utils/functions';
import { Post } from './utils/types';

export default function Home() {
  const { isLoggedIn } = useSelector((item: RootState) => item.auth);
  const userId = useSelector(currentUser);
  const loggedInUserPhoto = useGetUserPhotoQuery(userId);
  const router = useRouter();
  const dispatch = useDispatch();

  const [size] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, isLoading } = useGetPostsQuery({
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

  // Handle the post deletion
  const handlePostDeleted = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <h1>This is the home page</h1>
      {isLoggedIn && (
        <Image
          sizes='auto'
          alt='Post Photo'
          src={loggedInUserPhoto?.data?.photo}
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
        />
      )}
      <ThemeToggle />

      {isLoggedIn && (
        <Button onClick={logout} variant='secondary' size='medium'>
          logout
        </Button>
      )}

      {!isLoggedIn && (
        <Button
          onClick={() => router.push('/login')}
          variant='secondary'
          size='medium'
        >
          login
        </Button>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{}}>
          {uniquePosts.map((post: Post) => (
            <PostCard
              key={post._id}
              post={post}
              loading={isLoading}
              onPostDeleted={handlePostDeleted} // Pass the onPostDeleted prop
            />
          ))}
          <div style={{ textAlign: 'center' }}>
            {hasMore && (
              <Button onClick={loadMorePosts} variant='secondary' size='medium'>
                {!isLoading ? 'Load More' : 'Loading posts...'}
              </Button>
            )}

            {!hasMore && <p>No more posts to load.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
