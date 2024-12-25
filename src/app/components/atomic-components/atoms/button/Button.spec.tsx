import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button primary medium');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Click Me');
  });

  it('renders with custom props', () => {
    const { getByRole } = render(
      <Button variant='secondary' size='large' className='custom-class'>
        Click Me
      </Button>
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button secondary large custom-class');
  });

  it('renders as disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Click Me</Button>);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders loading state when isLoading prop is true', () => {
    const { getByRole } = render(<Button isLoading>Click Me</Button>);
    const button = getByRole('button');
    expect(button).toHaveTextContent('Loading');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
