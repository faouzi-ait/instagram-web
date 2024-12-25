import React from 'react';
import { render, screen } from '@testing-library/react';
import NameLabel from './index';

describe('NameLabel Component', () => {
  it('renders the name correctly', () => {
    render(<NameLabel name='John Doe' />);
    const label = screen.getByRole('text', { name: /name label: john doe/i });
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('John Doe');
  });

  it('applies the correct font size based on size prop', () => {
    render(<NameLabel name='John Doe' size='small' />);
    const label = screen.getByRole('text', { name: /name label: john doe/i });
    expect(label).toHaveStyle('font-size: 12px');
  });

  it('applies custom styles', () => {
    render(<NameLabel name='John Doe' style={{ color: 'red' }} />);
    const label = screen.getByRole('text', { name: /name label: john doe/i });
    expect(label).toHaveStyle('color: red');
  });

  it('applies custom className', () => {
    render(<NameLabel name='John Doe' className='custom-class' />);
    const label = screen.getByRole('text', { name: /name label: john doe/i });
    expect(label).toHaveClass('custom-class');
  });

  it('is accessible with aria-label and role', () => {
    render(<NameLabel name='John Doe' />);
    const label = screen.getByRole('text', { name: /name label: john doe/i });
    expect(label).toHaveAttribute('aria-label', 'Name label: John Doe');
    expect(label).toHaveAttribute('role', 'text');
    expect(label).toHaveAttribute('tabindex', '0');
  });
});
