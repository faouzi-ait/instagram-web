import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

const mockStore = configureMockStore();
const store = mockStore({
  counter: {
    value: 2,
  },
  theme: {
    theme: 'light',
    value: 'light',
  },
});

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('renders a heading', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const word = screen.getByText('This is the home page');
  expect(word).toBeInTheDocument();
});
