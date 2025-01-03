'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import Button from './components/atomic-components/atoms/button';
import Icon from './components/atomic-components/atoms/icons';
import Modal from './components/atomic-components/molecules/modal';
import InputField from './components/atomic-components/atoms/input';
import PostCard from './components/atomic-components/organism/card';
import HeaderSection from './components/atomic-components/organism/header-section';

import { RootState } from '../redux/store';
import { useGetPostsQuery } from '../redux/apiServices/postsApi';
import { useCreatePostMutation } from '../redux/apiServices/postsApi';

import { removeDuplicates } from './utils/functions';

import { Post } from './utils/types';

import styles from './page.module.css';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [createPost, items] = useCreatePostMutation();
  const { isLoggedIn } = useSelector((item: RootState) => item.auth);

  const [size] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const [postList, setPostList] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = useGetPostsQuery({
    searchTerm: '',
    pageSize: size,
    page,
  });

  useEffect(() => {
    if (data) {
      const sortedPosts = [...(data.items || [])].sort(
        (a: Post, b: Post) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPostList((prevPosts) =>
        removeDuplicates([...prevPosts, ...sortedPosts], '_id')
      );
      if (data.items.length < size) {
        setHasMore(false);
      }
    }
  }, [data, size, page]);

  const loadMorePosts = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const handleCommentAdded = (postId: string, newComment: any) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, reviews: [...post.reviews, newComment] }
          : post
      )
    );
  };

  const handlePostDeleted = (postId: string) => {
    setPostList((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const uniquePosts = removeDuplicates(postList, '_id');

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) formData.append('image', file);
    formData.append('post', text);

    try {
      const response = await createPost(formData).unwrap();

      if (response.success) {
        const newPost = response.newPost;
        setPostList((prevPosts) => [newPost, ...prevPosts]);
        setShowModal(false);
        setFile(null);
        setText('');
        refetch();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <HeaderSection>
        {isLoggedIn && (
          <>
            <Icon
              name='add'
              size={40}
              onClick={() => setShowModal(true)}
              color='black'
            />
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <form
                onSubmit={handleFormSubmit}
                className={styles.modalContentLayout}
              >
                <div className={styles.modalIcon}>
                  {file ? (
                    <div>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt='Selected'
                        width={100}
                        height={400}
                        className={styles.modalImageSize}
                      />
                      <Icon
                        name='remove'
                        size={40}
                        color='black'
                        className={styles.deleteIcon}
                        onClick={() => setFile(null)}
                      />
                    </div>
                  ) : (
                    <Icon
                      name='photo'
                      size={20}
                      color='red'
                      onClick={handleIconClick}
                      className={styles.fileInputIcon}
                    />
                  )}
                </div>
                <InputField
                  type='file'
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setFile(file);
                    }
                  }}
                  style={{ display: 'none' }}
                  required
                />
                <InputField
                  value={text}
                  placeholder='What are you up to?'
                  onChange={(e) => setText(e.target.value)}
                  className={styles.modalTextInput}
                  required
                />
                <Button
                  type='submit'
                  variant='secondary'
                  size='medium'
                  className={styles.submitButton}
                  disabled={items?.isLoading}
                >
                  {items?.isLoading ? 'Creating Post' : 'Share your Post'}
                </Button>
              </form>
            </Modal>
          </>
        )}
      </HeaderSection>
      <div className={styles.mainContentLayout}>
        <div>
          {uniquePosts.map((post: Post) => (
            <PostCard
              refetch={refetch}
              key={post._id}
              post={post}
              loading={false}
              onPostDeleted={handlePostDeleted}
              onCommentAdded={handleCommentAdded}
            />
          ))}
          <div className={styles.loadMoreButton}>
            {hasMore && (
              <Button
                onClick={loadMorePosts}
                variant='secondary'
                size='medium'
                disabled={isLoading}
              >
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
