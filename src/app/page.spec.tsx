import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const word = screen.getByText('Save and see your changes instantly.');
    expect(word).toBeInTheDocument();
  });
});
