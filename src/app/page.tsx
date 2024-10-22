'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';
import { useGetUserPhotoQuery } from '../redux/apiServices/authApi';
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
  const [postList, setPostList] = useState<Post[]>([]); // Single state to manage posts
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, isLoading } = useGetPostsQuery({
    searchTerm: '',
    pageSize: size,
    page,
  });

  useEffect(() => {
    if (data) {
      setPostList((prevPosts) => [...prevPosts, ...data.items]);
      if (data.items.length < size) {
        setHasMore(false);
      }
    }
  }, [data, size]);

  const loadMorePosts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  // When a comment is added, update the postList state correctly
  const handleCommentAdded = (postId: string, newComment: any) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, reviews: [...post.reviews, newComment] }
          : post
      )
    );
  };

  // When a post is deleted, update postList state
  const handlePostDeleted = (postId: string) => {
    setPostList((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const logout = async () => {
    dispatch(setLogout());
  };

  const uniquePosts = removeDuplicates(postList, '_id'); // Removing duplicates to avoid issues

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
              loading={false}
              onPostDeleted={handlePostDeleted}
              onCommentAdded={handleCommentAdded}
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
