import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from './index';

describe('Message Component', () => {
  it('renders the message when the condition is true', () => {
    render(<Message condition={true} text='Success message' />);

    const messageElement = screen.getByRole('alert');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('Success message');
    expect(messageElement).toHaveStyle({ color: 'green', fontWeight: 'bold' });
  });

  it('applies error styles when isError is true', () => {
    render(<Message condition={true} text='Error message' isError={true} />);

    const messageElement = screen.getByRole('alert');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent('Error message');
    expect(messageElement).toHaveStyle({ color: 'red', fontWeight: 'bold' });
  });

  it('does not render when the condition is false', () => {
    render(
      <Message condition={false} text='This message should not be visible' />
    );

    const messageElement = screen.queryByRole('alert');
    expect(messageElement).not.toBeInTheDocument();
  });

  it('applies the correct aria-live attribute', () => {
    render(
      <Message condition={true} text='Polite announcement' aria-live='polite' />
    );

    const messageElement = screen.getByRole('alert');
    expect(messageElement).toHaveAttribute('aria-live', 'polite');
  });

  it('handles assertive aria-live attribute', () => {
    render(
      <Message
        condition={true}
        text='Urgent announcement'
        aria-live='assertive'
      />
    );

    const messageElement = screen.getByRole('alert');
    expect(messageElement).toHaveAttribute('aria-live', 'assertive');
  });
});
