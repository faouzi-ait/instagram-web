import React from 'react';
import Avatar from '../../atoms/avatar';
import InputField from '../../atoms/input';
import Button from '../../atoms/button';

import styles from './comment.module.css';

interface CommentInputFieldProps {
  userPhoto: string;
  comment: string;
  // eslint-disable-next-line no-unused-vars
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitComment: () => void;
}

const CommentInputField: React.FC<CommentInputFieldProps> = ({
  userPhoto,
  comment,
  onCommentChange,
  onSubmitComment,
}) => {
  return (
    <div className={styles.commentLayout}>
      <Avatar src={userPhoto} alt="User's photo" size='xsmall' />
      <InputField
        placeholder='Comment here'
        value={comment}
        onChange={onCommentChange}
      />
      <Button
        variant='secondary'
        size='small'
        onClick={onSubmitComment}
        style={{ backgroundColor: 'black', color: 'white' }}
      >
        Comment
      </Button>
    </div>
  );
};

export default CommentInputField;
