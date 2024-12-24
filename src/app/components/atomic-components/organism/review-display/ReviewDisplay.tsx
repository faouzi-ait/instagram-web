import { ReviewDisplayProps } from '../../../../utils/types';
import { useGetUserPhotoQuery } from '../../../../../redux/apiServices/authApi';

import UserProfile from '../../molecules/user-info';
import styles from './page.module.css';

const ReviewDisplay = ({ userId, username, comment }: ReviewDisplayProps) => {
  const { data } = useGetUserPhotoQuery(userId);

  return (
    <div className={styles.displayLayout}>
      <div className={styles.contentFormat}>
        <UserProfile
          photo={data?.photo}
          name={username}
          alt="User's Profile Photo"
          avatarSize='xsmall'
          labelSize='medium'
          className={styles.userProfileLayout}
        />
      </div>
      <div className={styles.comment}>{comment}</div>
    </div>
  );
};

export default ReviewDisplay;
