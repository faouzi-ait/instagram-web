import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import KebabMenu from './index';

describe('KebabMenu Component', () => {
  it('should toggle the menu when the button is clicked', () => {
    render(
      <KebabMenu>
        <div>Menu Item</div>
      </KebabMenu>
    );

    const button = screen.getByRole('button', { name: /menu options/i });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    // Open the menu
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Close the menu
    fireEvent.click(button);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should close the menu when clicking outside', () => {
    render(
      <div>
        <KebabMenu>
          <div>Menu Item</div>
        </KebabMenu>
        <div data-testid='outside'>Outside</div>
      </div>
    );

    const button = screen.getByRole('button', { name: /menu options/i });

    // Open the menu
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Click outside the menu
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should close the menu and return focus to the button when Escape is pressed', () => {
    render(
      <KebabMenu>
        <div>Menu Item</div>
      </KebabMenu>
    );

    const button = screen.getByRole('button', { name: /menu options/i });

    // Open the menu
    fireEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    // Ensure focus is returned to the button
    expect(button).toHaveFocus();
  });

  it('should render children when the menu is open', () => {
    render(
      <KebabMenu>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
      </KebabMenu>
    );

    const button = screen.getByRole('button', { name: /menu options/i });

    // Open the menu
    fireEvent.click(button);
    expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
    expect(screen.getByText('Menu Item 2')).toBeInTheDocument();
  });
});
