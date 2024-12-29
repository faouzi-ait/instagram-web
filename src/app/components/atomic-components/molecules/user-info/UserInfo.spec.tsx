import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    // layout,
    width,
    height,
  }: {
    src: string;
    alt: string;
    className: string;
    // layout?: string;
    width?: number;
    height?: number;
  }) => (
    <img
      data-testid='avatar'
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  ),
}));

jest.mock('../../atoms/name-label', () => ({
  __esModule: true,
  default: ({ name, size }: { name: string; size: string }) => (
    <span data-testid='name-label' className={size}>
      {name}
    </span>
  ),
}));

describe('UserProfile Component', () => {
  const defaultProps = {
    photo: 'https://example.com/photo.jpg',
    name: 'John Doe',
    alt: 'Profile photo of John Doe',
  };

  test('renders with default props', () => {
    render(<UserProfile {...defaultProps} />);

    const avatar = screen.getByTestId('avatar');
    const nameLabel = screen.getByTestId('name-label');

    expect(avatar).toHaveAttribute('src', defaultProps.photo);
    expect(avatar).toHaveAttribute('alt', defaultProps.alt);
    expect(nameLabel).toHaveTextContent(defaultProps.name);
    expect(nameLabel).toHaveClass('medium');
  });

  test('renders with custom avatarSize and labelSize', () => {
    render(
      <UserProfile {...defaultProps} avatarSize='large' labelSize='small' />
    );

    const avatar = screen.getByTestId('avatar');
    const nameLabel = screen.getByTestId('name-label');

    expect(nameLabel).toHaveClass('small');
  });

  test('renders with additional style and className', () => {
    const customStyle = { color: 'red', marginLeft: '2rem' };
    const customClass = 'custom-profile-class';

    render(
      <UserProfile
        {...defaultProps}
        style={customStyle}
        className={customClass}
      />
    );

    const avatar = screen.getByTestId('avatar');
    const nameLabel = screen.getByTestId('name-label');
    const container = screen.getByText(defaultProps.name).parentElement;

    expect(avatar).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(container).toHaveClass(customClass);
  });
});
