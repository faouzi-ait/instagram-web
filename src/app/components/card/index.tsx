import Image from 'next/image';

import styles from './page.module.css';

type PostCardProps = {
  key?: any;
  photo: string;
  post: string;
  createdAt: string;
  isLoading: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  photo,
  post,
  createdAt,
  isLoading,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.topContent}>

      </div>
      <div className={styles.imageWrapper}>
        {!isLoading ? (
          <Image src={photo} alt='Post Photo' layout='fill' objectFit='cover' />
        ) : (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <span>{post}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default PostCard;
