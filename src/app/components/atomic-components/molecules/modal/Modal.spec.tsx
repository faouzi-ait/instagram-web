import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './index';

beforeAll(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterAll(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe('Modal Component', () => {
  it('renders the modal when `show` is true', () => {
    render(
      <Modal show={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when `show` is false', () => {
    render(
      <Modal show={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls `onClose` when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls `onClose` when clicking outside the modal content', () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call `onClose` when clicking inside the modal content', () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal Content').parentElement;
    fireEvent.click(modalContent!);

    expect(handleClose).not.toHaveBeenCalled();
  });
});
