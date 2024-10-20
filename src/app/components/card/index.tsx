import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/redux/store';

import KebabMenu from '../../components/kebab-menu';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useFavoritePostMutation,
  useUserFavoritePostMutation,
} from '../../../redux/apiServices/postsApi';

import { useGetUserQuery } from '../../../redux/apiServices/authApi';
import { currentUser } from '../../../redux/slices/selectors';
import {
  isLiked,
  isFavorites,
  hasReview,
  isOwnerPost,
} from '../../../app/utils/functions';
import { Post } from '../../utils/types';

import styles from './page.module.css';

type PostCardProps = {
  key?: any;
  post: Post;
  loading: boolean;
  onPostDeleted: (id: string) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  loading,
  onPostDeleted,
}) => {
  // const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  const { isLoggedIn } = useSelector((item: RootState) => item.auth);
  const userId = useSelector(currentUser);
  const postUser = useGetUserQuery(post?.user);
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [favoritePost] = useFavoritePostMutation();
  const [userFavoritePost] = useUserFavoritePostMutation();

  const isPostLiked = isLiked(post, userId);
  const isOwnPost = isOwnerPost(post, userId);
  const hasReviewed = hasReview(post, userId);

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(isPostLiked);

  const isFavoritedInitialState = isFavorites(post, userId);
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitialState);

  const handleDelete = async () => {
    try {
      await deletePost(post._id).unwrap(); // Delete post
      onPostDeleted(post._id); // Notify parent component to remove the post
    } catch (error) {
      console.error('Failed to delete the post: ', error);
    }
  };

  const handleLike = async () => {
    console.log(post._id);
    if (!isLoggedIn) return alert('You must be logged in to like a post');

    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await likePost(post._id).unwrap();
    } catch (error) {
      console.error('Failed to like the post:', error);
      setLiked(isPostLiked);
      setLikeCount(post.likes.length);
    }
  };

  const handleFavorite = async () => {
    if (!isLoggedIn) return alert('You must be logged in to favorite a post');
    setIsFavorited((prev) => !prev); // Toggle favorite state locally

    try {
      await favoritePost(post._id).unwrap();
      await userFavoritePost(post._id).unwrap();
    } catch (error) {
      console.error('Failed to favorite the post:', error);
      setIsFavorited(isFavorited); // To restore the original state
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.topContent}>
        <Image
          sizes='auto'
          alt='User Photo'
          src={postUser?.data?.user?.photo}
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
        />
        <div
          style={{
            marginLeft: '1rem',
            fontWeight: 'bold',
            fontFamily: 'Arial',
          }}
        >
          {postUser?.data?.user?.firstname} {postUser?.data?.user?.lastname}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <KebabMenu>
            <ul>
              {isOwnPost && (
                <li onClick={handleDelete} className={styles.delete}>
                  <span>Delete</span>
                  <span style={{ marginLeft: 'auto' }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              )}
              {!isOwnPost && (
                <li
                  style={{ color: 'red', fontSize: '.9rem' }}
                  onClick={() => console.log('Edit not allowed')}
                >
                  Edit not allowed
                </li>
              )}
            </ul>
          </KebabMenu>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        {!loading ? (
          <Image sizes='auto' alt='Post Image' src={post.photo} priority fill />
        ) : (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.icons}>
          <img
            src={`/icons/heart-${liked ? 'solid' : 'regular'}.svg`}
            alt='heart'
            width='24'
            height='24'
            onClick={handleLike}
          />
          <img
            src={`/icons/comment-${hasReviewed ? 'solid' : 'regular'}.svg`}
            alt='comment'
            width='24'
            height='24'
            onClick={() => console.log('comment', userId)}
            style={{ marginLeft: '.5rem' }}
          />
          <img
            src={`/icons/bookmark-${isFavorited ? 'solid' : 'regular'}.svg`}
            alt='bookmark'
            width='24'
            height='24'
            style={{ marginLeft: 'auto' }}
            onClick={handleFavorite}
          />
        </div>
      </div>
      <div className={styles.postTextSection}>
        {likeCount} like{`${likeCount > 1 ? 's' : ''}`}
        <div className={styles.postText}>{post.post}</div>
        <div className={styles.postText}>
          {post.totalReviews === 0
            ? 'No comments yet!'
            : `${post.totalReviews} comments`}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
