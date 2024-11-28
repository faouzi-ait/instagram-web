'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Button from '../../../atomic-components/atoms/button';
import { setTheme } from '../../../../../redux/slices/themeSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

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
    <Button onClick={toggleTheme} variant='secondary' size='large'>
      <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
    </Button>
  );
};

export default ThemeToggle;
