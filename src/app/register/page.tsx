'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import Icon from '../components/atomic-components/atoms/icons';
import Button from '../components/atomic-components/atoms/button';
import InputField from '../components/atomic-components/atoms/input';
import AuthGuard from '../components/route-protection/AuthGuard';

import { useCreateUserMutation } from '../../redux/apiServices/authApi';

import styles from './page.module.css';

type RegistrationError = {
  isLoading: boolean;
  error: {
    data?: {
      error?: string;
    };
  };
};

export default function RegisterPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [createUser, { isLoading, error }] =
    useCreateUserMutation<RegistrationError>();

  // State to handle form values, including the file input
  const [formValues, setFormValues] = useState<Record<string, any>>({
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    photo: null,
  });

  const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    e.preventDefault();

    try {
      formData.append('firstname', formValues.firstname);
      formData.append('lastname', formValues.lastname);
      formData.append('phone', formValues.phone);
      formData.append('username', formValues.username);
      formData.append('password', formValues.password);

      if (formValues.photo) {
        formData.append('image', formValues.photo);
      }

      await createUser(formData).unwrap();
      router.push('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetPhoto = () => {
    setFormValues((prev) => ({
      ...prev,
      photo: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AuthGuard condition='loggedIn' redirectTo='/'>
      <div className={styles.pageLayout}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <InputField
            name='firstname'
            value={formValues.firstname}
            placeholder='Your firstname'
            onChange={handleFormValues}
            className={styles.inputStyle}
            required
          />
          <InputField
            name='lastname'
            value={formValues.lastname}
            placeholder='Your lastname'
            onChange={handleFormValues}
            className={styles.inputStyle}
            required
          />
          <InputField
            name='phone'
            value={formValues.phone}
            placeholder='Your phone'
            onChange={handleFormValues}
            className={styles.inputStyle}
            required
          />
          <InputField
            name='username'
            value={formValues.username}
            placeholder='Your username'
            onChange={handleFormValues}
            className={styles.inputStyle}
            required
          />
          <InputField
            name='password'
            value={formValues.password}
            type='password'
            placeholder='Your password'
            onChange={handleFormValues}
            className={styles.inputStyle}
            required
          />
          <InputField
            ref={fileInputRef}
            name='photo'
            type='file'
            onChange={handleFormValues}
            className={styles.inputStyle}
          />

          {formValues.photo && (
            <div style={{ marginBottom: '10px' }}>
              <Image
                src={URL.createObjectURL(formValues.photo)}
                alt='Selected'
                width={100}
                height={400}
                className={styles.imageSize}
              />
              <Icon
                name='remove'
                size={40}
                color='black'
                style={{ position: 'absolute' }}
                onClick={resetPhoto}
              />
            </div>
          )}

          <Button
            type='submit'
            variant='secondary'
            size='medium'
            className={styles.submit}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        {error && (
          <p className={styles.errorMessage}>
            {error.data?.error || 'Something went wrong'}
          </p>
        )}

        <a href='/' className={styles.homeLink}>
          Go to Home Page
        </a>
        <br />
        <br />
        <a href='/login' className={styles.homeLink}>
          Login to your account
        </a>
      </div>
    </AuthGuard>
  );
}
