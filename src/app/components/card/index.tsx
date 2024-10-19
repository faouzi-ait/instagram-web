import Image from 'next/image';
import { useSelector } from 'react-redux';

import KebabMenu from '../../components/kebab-menu';
import {
  useGetUserPhotoQuery,
  useGetUserQuery,
} from '../../../redux/apiServices/authApi';
import * as api from '../../../redux/apiServices/postsApi';
import { currentUser } from '../../../redux/slices/selectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Post } from '../../utils/types';

import styles from './page.module.css';

type PostCardProps = {
  key?: any;
  post: Post;
  loading: boolean;
};

const PostCard: React.FC<PostCardProps> = ({ post, loading }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const userId = useSelector(currentUser);
  const [deletePost, { isLoading }] = api.useDeletePostMutation();
  const postUser = useGetUserQuery(post?.user);

  const isLoggedInUserPost = post.user === userId;

  return (
    <div className={styles.card}>
      <div className={styles.topContent}>
        <Image
          sizes='auto'
          alt='Post Photo'
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
              {isLoggedInUserPost && (
                <li
                  onClick={() => alert('alert')}
                  style={{ display: 'flex', color: 'red', fontSize: '.9rem' }}
                >
                  <span>Delete</span>
                  <span style={{ marginLeft: 'auto' }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </li>
              )}
              {!isLoggedInUserPost && <li
                style={{ color: 'red', fontSize: '.9rem' }}
                onClick={() => console.log('Option 3 clicked')}
              >
                Edit not allowed
              </li>}
            </ul>
          </KebabMenu>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        {!loading ? (
          <Image sizes='auto' alt='Post Photo' src={post.photo} priority fill />
        ) : (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <span>{post.post}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default PostCard;
