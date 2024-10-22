import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/redux/store';

import KebabMenu from '../../components/kebab-menu';
import PostTextSection from '../comment';

import * as util from '../../../app/utils/functions';
import * as api from '../../../redux/apiServices/postsApi';
import {
  useGetUserQuery,
  useGetUserPhotoQuery,
} from '../../../redux/apiServices/authApi';
import { currentUser } from '../../../redux/slices/selectors';
import { Post } from '../../utils/types';

import styles from './page.module.css';

type PostCardProps = {
  post: Post;
  loading: boolean;
  onPostDeleted: (id: string) => void;
  onCommentAdded: (id: string, newComment: any) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  loading,
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
  const [confirmMessage, setConfirmMessage] = useState('');
  const isFavoritedInitialState = util.isFavorites(post, userId);
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitialState);

  const postOwnerData = postUser?.data;

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost(post._id).unwrap();
      onPostDeleted(post._id);
    } catch (error: unknown) {
      console.error('Failed to delete the post:', error);
    }
  };

  const handleLike = async (): Promise<void> => {
    if (!isLoggedIn) return alert('You must be logged in to like a post');

    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await likePost(post._id).unwrap();
    } catch (error) {
      console.error('Failed to like the post:', error);
      // Revert state in case of an error
      setLiked(isPostLiked);
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
      console.error('Failed to favorite the post:', error);
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
      const dd = await createReview({
        rating: 0,
        postID: id,
        comment,
      }).unwrap();
      setComment('');
      onCommentAdded(id, newReview);

      setConfirmMessage(dd.message);

      setTimeout(() => {
        setConfirmMessage('');
      }, 2000);
    } catch (error: unknown) {
      console.error('Failed to create review:', error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.topContent}>
        <Image
          sizes='auto'
          alt='User Photo'
          src={postOwnerData?.user?.photo}
          width={50}
          height={50}
          style={{ borderRadius: '50%' }}
        />
        <div className={styles.name}>
          {postOwnerData?.user?.firstname} {postOwnerData?.user?.lastname}
        </div>
        {isOwnPost && (
          <div className={styles.flexMargin}>
            <KebabMenu>
              <ul>
                <li onClick={handleDelete} className={styles.delete}>
                  <span>Delete</span>
                  <span className={styles.flexMargin}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              </ul>
            </KebabMenu>
          </div>
        )}
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
            className={styles.flexMargin}
            onClick={handleFavorite}
          />
        </div>
      </div>

      <PostTextSection post={post} likeCount={likeCount} />

      {!util.hasReview(post, userId) && isLoggedIn && (
        <div className={styles.postTextSection}>
          <Image
            sizes='auto'
            alt='User Photo'
            src={loggedInUserPhoto?.data?.photo}
            width={30}
            height={30}
            style={{ borderRadius: '50%' }}
          />
          <input
            placeholder='Comment'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            style={{ margin: '0 0 0 .75rem', padding: '2px' }}
          />
          <button
            type='button'
            onClick={() => sendComment(post._id)}
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Comment
          </button>
          <span style={{ marginLeft: '.5rem', color: 'green' }}>
            {confirmMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostCard;
