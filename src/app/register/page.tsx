'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import Icon from '../components/atomic-components/atoms/icons';
import Button from '../components/atomic-components/atoms/button';
import InputField from '../components/atomic-components/atoms/input';
import AuthGuard from '../components/route-protection/AuthGuard';
import PageLayout from '../components/atomic-components/atoms/page-layout';
import HeaderSection from '../components/atomic-components/organism/header-section';

import { useCreateUserMutation } from '../../redux/apiServices/authApi';

import { inputFields } from '../utils/functions';

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
      <HeaderSection />
      <PageLayout title='Register'>
        <form onSubmit={handleSubmit} className='formLayout'>
          {inputFields(fileInputRef).map((field, index) => (
            <InputField
              key={index}
              type={field.type || 'text'}
              ref={field.ref || null}
              name={field.name}
              placeholder={field.placeholder}
              value={
                field.name !== 'photo' ? formValues[field.name] : undefined
              }
              onChange={handleFormValues}
              required={field.required}
            />
          ))}

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
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        {error && (
          <p className='errorMessage'>
            {error.data?.error || 'Something went wrong'}
          </p>
        )}
      </PageLayout>
    </AuthGuard>
  );
}
