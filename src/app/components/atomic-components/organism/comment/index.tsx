'use client';

import React, { useState } from 'react';
import { Post } from '../../../../utils/types';
import * as util from '../../../../utils/functions';

import Modal from '../../molecules/modal';
import CommentList from '../../molecules/comment-list';

import styles from './page.module.css';

interface PostTextSectionProps {
  post: Post;
  likeCount: number;
}

const PostTextSection: React.FC<PostTextSectionProps> = ({
  post,
  likeCount,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.postTextSection}>
      {likeCount} like{likeCount > 1 ? 's' : ''}
      <div className={styles.postText}>{post.post}</div>
      <div className={styles.lowerPostText}>
        {post.reviews.length > 0 && (
          <div className={styles.postText} onClick={() => setShowModal(true)}>
            <span style={{ cursor: 'pointer' }}>
              View comment{post.totalReviews > 1 ? 's' : ''} (
              {post.reviews.length})
            </span>
          </div>
        )}
        <div className={styles.postText}>{util.formattedDate(post)}</div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CommentList postId={post._id} />
      </Modal>
    </div>
  );
};

export default PostTextSection;
