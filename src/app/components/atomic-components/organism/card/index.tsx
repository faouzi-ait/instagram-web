import Image from 'next/image';
import React, { useState } from 'react';

import PostTextSection from '../comment';
import MenuItem from '../../atoms/menu-item';
import MenuList from '../../atoms/menu-list';
import KebabMenu from '../../molecules/kebab-menu';
import UserProfile from '../../molecules/user-info';
import CommentInput from '../../molecules/comment-input';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

type PostCardProps = {
  post: Post;
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  onPostDeleted: (id: string) => void;

  // eslint-disable-next-line no-unused-vars
  onCommentAdded: (id: string, newComment: any) => void;
};

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
  // const [confirmMessage, setConfirmMessage] = useState('');
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

      // setConfirmMessage(dd.message);
    } catch (error: any) {
      return error;
      // console.error('Failed to create review:', error);
    }
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
          <div className={styles.flexMargin}>
            <KebabMenu>
              <MenuList onClick={() => null}>
                <MenuItem
                  style={{ color: 'red' }}
                  onClick={handleDelete}
                  className={styles.delete}
                >
                  <span>Delete</span>
                  <span className={styles.flexMargin}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </MenuItem>
              </MenuList>
            </KebabMenu>
          </div>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <Image sizes='auto' alt='Post Image' src={post.photo} priority fill />
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
            style={{ marginLeft: '.5rem' }}
            // onClick={() => console.log('comment', userId)}
          />
          <img
            src={`/icons/bookmark-${isFavorited ? 'solid' : 'regular'}.svg`}
            alt='bookmark'
            width='24'
            height='24'
            className={styles.flexMargin}
            onClick={handleFavorite}
          />
        </div>
      </div>

      <PostTextSection post={post} likeCount={likeCount} />

      {!util.hasReview(post, userId) && isLoggedIn && (
        <div className={styles.postTextSection}>
          <CommentInput
            userPhoto={loggedInUserPhoto?.data?.photo}
            comment={comment}
            onCommentChange={(e) => setComment(e.target.value)}
            onSubmitComment={() => sendComment(post._id)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
