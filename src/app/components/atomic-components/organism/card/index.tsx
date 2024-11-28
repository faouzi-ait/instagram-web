import Image from 'next/image';
import React, { Suspense, useState } from 'react';

import Icon from '../../atoms/icons';
import PostTextSection from '../comment';
import MenuItem from '../../atoms/menu-item';
import MenuList from '../../atoms/menu-list';
import KebabMenu from '../../molecules/kebab-menu';
import UserProfile from '../../molecules/user-info';
import CommentInput from '../../molecules/comment-input';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import * as util from '../../../../utils/functions';
import * as api from '../../../../../redux/apiServices/postsApi';

import {
  useGetUserQuery,
  useGetUserPhotoQuery,
} from '../../../../../redux/apiServices/authApi';
import { currentUser } from '../../../../../redux/slices/selectors';
import { Post } from '../../../../utils/types';

import styles from './page.module.css';

const LazyImage = React.lazy(() => import('next/image'));

type PostCardProps = {
  post: Post;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  onPostDeleted: (id: string) => void;

  // eslint-disable-next-line no-unused-vars
  onCommentAdded: (id: string, newComment: any) => void;
};

interface PostImageProps {
  photo: string;
  alt: string;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  // loading,
  onPostDeleted,
  onCommentAdded,
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const userId = useSelector(currentUser);
  const [likePost] = api.useLikePostMutation();
  const postUser = useGetUserQuery(post?.user);
  const [deletePost] = api.useDeletePostMutation();
  const [favoritePost] = api.useFavoritePostMutation();
  const [userFavoritePost] = api.useUserFavoritePostMutation();
  const [createReview] = api.useCreateReviewMutation();
  const loggedInUserPhoto = useGetUserPhotoQuery(userId);

  const isPostLiked = util.isLiked(post, userId);
  const isOwnPost = util.isOwnerPost(post, userId);
  const hasReviewed = util.hasReview(post, userId);

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(isPostLiked);
  const [comment, setComment] = useState('');
  const isFavoritedInitialState = util.isFavorites(post, userId);
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitialState);

  const postOwnerData = postUser?.data?.user;

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost(post._id).unwrap();
      onPostDeleted(post._id);
    } catch (error: any) {
      // console.error('Failed to delete the post:', error);
      return error;
    }
  };

  const handleLike = async (): Promise<void> => {
    if (!isLoggedIn) return alert('You must be logged in to like a post');

    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await likePost(post._id).unwrap();
    } catch (error) {
      // console.error('Failed to like the post:', error);

      setLiked(isPostLiked); // Revert state in case of an error
      setLikeCount(post.likes.length);
    }
  };

  const handleFavorite = async (): Promise<void> => {
    if (!isLoggedIn) return alert('You must be logged in to favorite a post');

    setIsFavorited((prevFavorited) => !prevFavorited); // Toggle favorite state locally

    try {
      await favoritePost(post._id).unwrap();
      await userFavoritePost(post._id).unwrap();
    } catch (error: unknown) {
      // console.error('Failed to favorite the post:', error);
      setIsFavorited(isFavorited); // Restore state in case of error
    }
  };

  const sendComment = async (id: string) => {
    if (!comment) return alert('Please type in a comment');

    const newReview = {
      comment: comment,
      user: userId,
      createdAt: new Date().toISOString(),
    };

    try {
      await createReview({
        rating: 0,
        postID: id,
        comment,
      }).unwrap();
      setComment('');
      onCommentAdded(id, newReview);
    } catch (error: any) {
      return error;
      // console.error('Failed to create review:', error);
    }
  };

  const PostImage: React.FC<PostImageProps> = ({ photo, alt }) => {
    return (
      <div className={styles.imageWrapper}>
        <div className={styles.loaderContainer}>
          <Suspense fallback={<div className={styles.loader}></div>}>
            <LazyImage sizes='auto' alt={alt} src={photo} priority fill />
          </Suspense>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.topContent}>
        <UserProfile
          photo={postOwnerData?.photo}
          name={`${postOwnerData?.firstname} ${postOwnerData?.lastname}`}
          alt="User's Profile Photo"
          avatarSize='small'
          labelSize='medium'
          className={styles.userProfileLayout}
        />
        {isOwnPost && (
          <div className={styles.rightAlignment}>
            <KebabMenu>
              <MenuList onClick={() => null}>
                <MenuItem
                  style={{ color: 'red' }}
                  onClick={handleDelete}
                  className={styles.delete}
                >
                  <span>Delete</span>
                  <Icon
                    name='trash'
                    size={18}
                    className={styles.rightAlignment}
                  />
                </MenuItem>
              </MenuList>
            </KebabMenu>
          </div>
        )}
      </div>

      <PostImage photo={post.photo} alt='Post Image' />

      <div className={styles.content}>
        <div className={styles.icons}>
          <Icon name={util.iconDisplay('heart', liked)} onClick={handleLike} />
          <Icon name={util.iconDisplay('comment', hasReviewed)} size={24} />
          <Icon
            name={util.iconDisplay('bookmark', isFavorited)}
            className={styles.rightAlignment}
            onClick={handleFavorite}
          />
        </div>
      </div>

      <PostTextSection post={post} likeCount={likeCount} />

      {!util.hasReview(post, userId) && isLoggedIn && (
        <div className={styles.postTextSection}>
          <CommentInput
            comment={comment}
            userPhoto={loggedInUserPhoto?.data?.photo}
            onSubmitComment={() => sendComment(post._id)}
            onCommentChange={(e) => setComment(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
