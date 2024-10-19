import Image from 'next/image';
import { useSelector } from 'react-redux';

import KebabMenu from '../../components/kebab-menu';
import {
  useGetUserPhotoQuery,
  useGetUserQuery,
} from '../../../redux/apiServices/authApi';
import {
  currentUserData,
  currentUser,
  loggedInStatus,
} from '../../../redux/slices/selectors';

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

  const { isLoggedIn } = useSelector(loggedInStatus);
  const userId = useSelector(currentUser);

  const postUser = useGetUserQuery(post?.user);
  const loggedInUserPhoto = useGetUserPhotoQuery(userId);

  console.log(post);

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
              <li onClick={() => console.log('Option 1 clicked')}>Option 1</li>
              <li onClick={() => console.log('Option 2 clicked')}>Option 2</li>
              <li onClick={() => console.log('Option 3 clicked')}>Option 3</li>
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
