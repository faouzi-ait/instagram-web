import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from './index';

describe('Avatar Component', () => {
  it('renders correctly with provided props', () => {
    render(
      <Avatar
        src='https://via.placeholder.com/30'
        alt='Test Avatar'
        size='medium'
      />
    );

    const image = screen.getByAltText('Test Avatar');
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute('width', '75');
    expect(image).toHaveAttribute('height', '75');
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fvia.placeholder.com%2F30&w=256&q=75'
    );
  });

  it('applies custom styles and className', () => {
    render(
      <Avatar
        src='https://via.placeholder.com/30'
        alt='Styled Avatar'
        style={{ border: '2px solid red' }}
        className='custom-class'
      />
    );

    const image = screen.getByAltText('Styled Avatar');
    expect(image).toHaveStyle('border: 2px solid red');
    expect(image).toHaveClass('custom-class');
  });

  it('renders with default size if size prop is not provided', () => {
    render(
      <Avatar src='https://via.placeholder.com/30' alt='Default Size Avatar' />
    );

    const image = screen.getByAltText('Default Size Avatar');
    expect(image).toHaveAttribute('width', '75');
    expect(image).toHaveAttribute('height', '75');
  });

  it('renders with the correct size when size prop is set', () => {
    render(
      <Avatar
        src='https://via.placeholder.com/30'
        alt='Large Avatar'
        size='large'
      />
    );

    const image = screen.getByAltText('Large Avatar');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('does not render if src is not provided', () => {
    const { container } = render(<Avatar src='' alt='Empty Source' />);
    expect(container.firstChild).toBeNull();
  });
});
