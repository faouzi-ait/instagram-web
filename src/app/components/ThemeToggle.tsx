'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../redux/slices/themeSlice';
import { AppDispatch } from '@/redux/store';
import { PayloadAction } from '@reduxjs/toolkit';

const ThemeToggle = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      `(prefers-color-scheme: ${theme})`
    ).matches;

    if (systemPrefersDark) {
      dispatch(setTheme('dark'));
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch, theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
  );
};

export default ThemeToggle;
