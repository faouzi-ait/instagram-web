import React from 'react';
import { render, screen } from '@testing-library/react';
import PageLayout from './index';

describe('PageLayout Component', () => {
  it('renders the title correctly', () => {
    render(<PageLayout title='Test Title'>Test Content</PageLayout>);

    const titleElement = screen.getByRole('heading', { name: 'Test Title' });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('title');
    expect(titleElement).toHaveAttribute('id', 'page-title');
  });

  it('renders children content', () => {
    render(
      <PageLayout title='Test Title'>
        <p>Sample Content</p>
      </PageLayout>
    );

    const contentElement = screen.getByText('Sample Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('ensures accessibility attributes are present', () => {
    render(<PageLayout title='Accessible Page'>Accessible Content</PageLayout>);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-labelledby', 'page-title');
  });

  it('applies the correct layout styles', () => {
    render(<PageLayout title='Styled Page'>Styled Content</PageLayout>);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('pageLayout');
  });
});
