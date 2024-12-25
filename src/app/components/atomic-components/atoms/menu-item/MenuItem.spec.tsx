import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from './index';

describe('MenuItem Component', () => {
  test('renders the MenuItem with children correctly', () => {
    render(<MenuItem>Test Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveTextContent('Test Item');
  });

  test('applies custom styles and className', () => {
    const customStyle = { backgroundColor: 'red' };
    const customClass = 'custom-class';

    render(
      <MenuItem style={customStyle} className={customClass}>
        Styled Item
      </MenuItem>
    );

    const menuItem = screen.getByRole('menuitem');
    expect(menuItem).toHaveStyle('background-color: red');
    expect(menuItem).toHaveClass(customClass);
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();

    render(<MenuItem onClick={handleClick}>Clickable Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles onKeyDown event for Enter key', () => {
    const handleClick = jest.fn();

    render(<MenuItem onClick={handleClick}>Keyboard Accessible Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem');
    fireEvent.keyDown(menuItem, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles onKeyDown event for Space key', () => {
    const handleClick = jest.fn();

    render(<MenuItem onClick={handleClick}>Keyboard Accessible Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem');
    fireEvent.keyDown(menuItem, { key: ' ' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies aria-label correctly', () => {
    render(<MenuItem aria-label='Custom Label'>Labeled Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem', { name: 'Custom Label' });
    expect(menuItem).toBeInTheDocument();
  });

  test('does not trigger onClick or keyDown if no handler is provided', () => {
    render(<MenuItem>No Handler Item</MenuItem>);

    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);
    fireEvent.keyDown(menuItem, { key: 'Enter' });
    fireEvent.keyDown(menuItem, { key: ' ' });

    expect(menuItem).toBeInTheDocument();
  });
});
