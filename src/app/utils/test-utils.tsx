import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const renderWithProviders = (ui: React.ReactElement, options?: any) => {
  return render(<Provider store={store}>{ui}</Provider>, options);
};

export * from '@testing-library/react';
export { renderWithProviders as render };
