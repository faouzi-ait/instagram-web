'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

import PostCard from './components/atomic-components/organism/card';
import Button from './components/atomic-components/atoms/button';
import Header from './components/atomic-components/atoms/header';
import ThemeToggle from './components/atomic-components/molecules/toggle-theme';

import { useGetPostsQuery } from '../redux/apiServices/postsApi';
import { useGetUserPhotoQuery } from '../redux/apiServices/authApi';
import { currentUser } from '../redux/slices/selectors';

import { setLogout } from '../redux/slices/authSlice';
import { removeDuplicates } from './utils/functions';

import { Post } from './utils/types';
import UserProfile from './components/atomic-components/molecules/user-info';

import styles from './page.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((item: RootState) => item.auth);
  const userId = useSelector(currentUser);
  const loggedInUserPhoto = useGetUserPhotoQuery(userId);
  const router = useRouter();

  const [size] = useState<number>(3);
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

  const uniquePosts = removeDuplicates(postList, '_id');

  return (
    <>
      <Header>
        <>
          {isLoggedIn && (
            <UserProfile
              photo={loggedInUserPhoto?.data?.photo}
              name={`${user.firstname} ${user.lastname}`}
              alt="User's Profile Photo"
              avatarSize='medium'
              labelSize='medium'
              className={styles.userProfileLayout}
            />
          )}

          <div style={{ marginLeft: 'auto' }}>
            <ThemeToggle />
            {isLoggedIn && (
              <Button
                onClick={logout}
                variant='secondary'
                size='large'
                style={{ marginLeft: '5px' }}
              >
                logout
              </Button>
            )}

            {!isLoggedIn && (
              <Button
                onClick={() => router.push('/login')}
                variant='secondary'
                size='large'
                style={{ marginLeft: '5px' }}
              >
                login
              </Button>
            )}
          </div>
        </>
      </Header>
      <div className={styles.mainContentLayout}>
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
    </>
  );
}
