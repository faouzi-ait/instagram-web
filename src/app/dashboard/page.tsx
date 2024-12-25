'use client';

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import Icon from '../components/atomic-components/atoms/icons';
import Button from '../components/atomic-components/atoms/button';
import Message from '../components/atomic-components/atoms/message';
import InputField from '../components/atomic-components/atoms/input';
import PageLayoutDisplay from '../components/atomic-components/template';

import {
  useGetUserQuery,
  useGetUserPhotoQuery,
  useUpdateUserPhotoMutation,
  useUpdateUserDetailsMutation,
} from '../../redux/apiServices/authApi';

import { currentUser } from '../../redux/slices/selectors';
import { updateInputFields } from '../utils/functions';

import styles from './page.module.css';

export default function Dashboard() {
  const userId = useSelector(currentUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const { data: loggedInUserPhoto, refetch: refetchUserPhoto } =
    useGetUserPhotoQuery(userId);

  const { refetch: refetchUserData } = useGetUserQuery(userId);

  const [
    updateUserPhoto,
    { isLoading: photoLoading, error: photoError, data: photoData },
  ] = useUpdateUserPhotoMutation();

  const [
    updateUserDetails,
    { isLoading: detailsLoading, error: detailError, data: detailData },
  ] = useUpdateUserDetailsMutation();

  const [formValues, setFormValues] = useState<Record<string, any>>({
    firstname: '',
    lastname: '',
    phone: '',
  });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
  };

  const handleTextFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserDetails(formValues);
      await refetchUserData();
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  const handlePhotoFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!photo) {
      alert('Please select a photo!');
      return false;
    }

    try {
      const formData = new FormData();
      formData.append('image', photo);

      await updateUserPhoto(formData);
      await refetchUserPhoto();
      setPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <PageLayoutDisplay
      title='Update your details'
      condition='public'
      redirectTo='/'
    >
      <div className={styles.dashboardContainer}>
        <form onSubmit={handleTextFormSubmit} className='formLayout'>
          {updateInputFields.map((field, index) => (
            <InputField
              key={index}
              type='text'
              name={field.name}
              placeholder={field.placeholder}
              value={formValues[field.name]}
              onChange={handleTextInputChange}
              required={field.required}
            />
          ))}
          <Button
            type='submit'
            variant='secondary'
            size='medium'
            disabled={detailsLoading}
          >
            {detailsLoading ? 'Updating Details...' : 'Update Details'}
          </Button>

          <Message
            condition={detailData}
            text={detailData?.message as string}
            isError={false}
          />

          <Message
            condition={detailError}
            text={'There was an error while updating info'}
            isError
          />
        </form>

        <form onSubmit={handlePhotoFormSubmit} className='formLayout'>
          <div className={styles.imageUpdateLayout}>
            {(photo || loggedInUserPhoto?.photo) && (
              <Image
                src={
                  photo ? URL.createObjectURL(photo) : loggedInUserPhoto?.photo
                }
                alt='Selected or User Photo'
                width={50}
                height={150}
                className={styles.imageSize}
              />
            )}

            <InputField
              ref={fileInputRef}
              type='file'
              name='photo'
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />

            {photo ? (
              <Icon
                name='remove'
                size={40}
                color='black'
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  right: 0,
                }}
                onClick={resetPhoto}
              />
            ) : (
              <Icon
                name='photo'
                size={40}
                color='black'
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  right: 0,
                }}
                onClick={handleIconClick}
              />
            )}
          </div>
          <Button
            type='submit'
            variant='secondary'
            size='medium'
            disabled={photoLoading}
          >
            {photoLoading ? 'Updating Photo...' : 'Update Photo'}
          </Button>

          <Message
            condition={photoData}
            text='Your photo was successfully uploaded'
            isError={false}
          />

          <Message
            condition={photoError}
            text='There was an error during upload...'
            isError
          />
        </form>
      </div>
    </PageLayoutDisplay>
  );
}
