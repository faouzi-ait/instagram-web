import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './index';

describe('Header Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Header>
        <h1>Header Title</h1>
      </Header>
    );
    const headerElement = getByText('Header Title');
    expect(headerElement).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    const { container } = render(
      <Header>
        <h1>Header Title</h1>
      </Header>
    );
    expect(container.firstChild).toHaveClass('header');
    expect(container.firstChild).toHaveTextContent('Header Title');
  });
});
