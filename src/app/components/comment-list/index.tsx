import Image from 'next/image';
import React from 'react';

import { useGetSinglePostQuery } from '../../../redux/apiServices/postsApi';
import { useGetUserPhotoQuery } from '../../../redux/apiServices/authApi';

import { Review, ReviewDisplayProps } from '../../../app/utils/types';

import styles from './page.module.css';

interface CommentListProps {
  postId: string;
}

const ReviewDisplay = ({ userId, username, comment }: ReviewDisplayProps) => {
  const { data } = useGetUserPhotoQuery(userId);
  return (
    <div className={styles.displayLayout}>
      <div className={styles.contentFormat}>
        <Image
          sizes='auto'
          alt='User Photo'
          src={data?.photo}
          width={30}
          height={30}
          style={{ borderRadius: '50%' }}
        />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.comment}>{comment}</div>
    </div>
  );
};

const CommentList = ({ postId }: CommentListProps) => {
  const { data } = useGetSinglePostQuery(postId);
  return (
    <>
      {data?.post?.reviews?.map((item: Review, i: string) => (
        <ReviewDisplay
          key={i}
          userId={item.user}
          username={item.username}
          comment={item.comment}
        />
      ))}
    </>
  );
};

export default CommentList;
