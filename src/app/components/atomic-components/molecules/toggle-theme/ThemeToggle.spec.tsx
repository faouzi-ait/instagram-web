import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../../../../../redux/slices/themeSlice';
import ThemeToggle from './index';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='icon' />,
}));

describe('ThemeToggle Component', () => {
  beforeAll(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes('dark'),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });

  const renderWithStore = (preloadedState: any) => {
    const store = configureStore({
      reducer: {
        theme: themeReducer,
      },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );
  };

  test('renders correctly with light theme', () => {
    renderWithStore({ theme: { theme: 'light' } });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('renders correctly with dark theme', () => {
    renderWithStore({ theme: { theme: 'dark' } });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('toggles theme on button click', () => {
    const store = configureStore({
      reducer: {
        theme: themeReducer,
      },
      preloadedState: { theme: { theme: 'light' } },
    });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const button = screen.getByRole('button');

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(button);
    expect(store.getState().theme.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(button);
    expect(store.getState().theme.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('updates theme based on system preference', () => {
    const store = configureStore({
      reducer: {
        theme: themeReducer,
      },
      preloadedState: { theme: { theme: 'light' } },
    });

    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    expect(store.getState().theme.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
