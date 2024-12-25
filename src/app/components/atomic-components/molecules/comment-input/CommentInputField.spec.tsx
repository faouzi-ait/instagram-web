import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentInputField from './index';

jest.mock('../../atoms/avatar', () => {
  const Avatar = () => <div>Avatar</div>;
  Avatar.displayName = 'Avatar';
  return Avatar;
});

jest.mock('../../atoms/button', () => {
  const Button = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>;
  Button.displayName = 'Button';
  return Button;
});

jest.mock('../../atoms/input', () => {
  const Input = ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: () => void;
    placeholder: string;
  }) => <input value={value} onChange={onChange} placeholder={placeholder} />;
  Input.displayName = 'Input';
  return Input;
});

describe('CommentInputField', () => {
  const mockOnCommentChange = jest.fn();
  const mockOnSubmitComment = jest.fn();
  const userPhoto = 'https://example.com/photo.jpg';
  const comment = 'Test comment';

  beforeEach(() => {
    mockOnCommentChange.mockClear();
    mockOnSubmitComment.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <CommentInputField
        comment={comment}
        userPhoto={userPhoto}
        onCommentChange={mockOnCommentChange}
        onSubmitComment={mockOnSubmitComment}
      />
    );

    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Comment here')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
  });

  it('displays the correct initial comment value', () => {
    render(
      <CommentInputField
        comment={comment}
        userPhoto={userPhoto}
        onCommentChange={mockOnCommentChange}
        onSubmitComment={mockOnSubmitComment}
      />
    );

    expect(screen.getByPlaceholderText('Comment here')).toHaveValue(comment);
  });

  it('calls onCommentChange when the input value changes', () => {
    render(
      <CommentInputField
        comment={comment}
        userPhoto={userPhoto}
        onCommentChange={mockOnCommentChange}
        onSubmitComment={mockOnSubmitComment}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Comment here'), {
      target: { value: 'New comment' },
    });

    expect(mockOnCommentChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmitComment when the submit button is clicked', () => {
    render(
      <CommentInputField
        comment={comment}
        userPhoto={userPhoto}
        onCommentChange={mockOnCommentChange}
        onSubmitComment={mockOnSubmitComment}
      />
    );

    fireEvent.click(screen.getByText('Comment'));
    expect(mockOnSubmitComment).toHaveBeenCalledTimes(1);
  });
});
