import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkItem from './index';
import '@testing-library/jest-dom';

describe('LinkItem Component', () => {
  it('renders the link with the correct label', () => {
    render(<LinkItem href='/home' label='Home' testId='link-item' />);

    const link = screen.getByTestId('link-item');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Home');
  });

  it('applies the correct href attribute', () => {
    render(<LinkItem href='/about' label='About' testId='link-item' />);

    const link = screen.getByTestId('link-item');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('applies custom classes', () => {
    render(
      <LinkItem
        href='/contact'
        label='Contact'
        className='custom-class'
        testId='link-item'
      />
    );

    const link = screen.getByTestId('link-item');
    expect(link).toHaveClass('custom-class');
  });

  it('uses the default aria-label when ariaLabel is not provided', () => {
    render(<LinkItem href='/profile' label='Profile' testId='link-item' />);

    const link = screen.getByTestId('link-item');
    expect(link).toHaveAttribute('aria-label', 'Profile');
  });

  it('uses a custom aria-label when provided', () => {
    render(
      <LinkItem
        href='/settings'
        label='Settings'
        ariaLabel='Custom Label'
        testId='link-item'
      />
    );

    const link = screen.getByTestId('link-item');
    expect(link).toHaveAttribute('aria-label', 'Custom Label');
  });

  it('spreads additional attributes', () => {
    render(
      <LinkItem
        href='/help'
        label='Help'
        data-custom-attr='custom-value'
        testId='link-item'
      />
    );

    const link = screen.getByTestId('link-item');
    expect(link).toHaveAttribute('data-custom-attr', 'custom-value');
  });
});
