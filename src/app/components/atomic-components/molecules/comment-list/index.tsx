import React from 'react';
import ReviewDisplay from '../../organism/review-display/ReviewDisplay';

import { useGetSinglePostQuery } from '../../../../../redux/apiServices/postsApi';

import { Review } from '../../../../utils/types';

interface CommentListProps {
  postId: string;
}

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
