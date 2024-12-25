import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuList from './index';

describe('MenuList Component', () => {
  it('renders the MenuList with children', () => {
    render(
      <MenuList>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </MenuList>
    );

    const menu = screen.getByRole('menu', { name: /menu options/i });
    expect(menu).toBeInTheDocument();

    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent('Option 1');
    expect(items[1]).toHaveTextContent('Option 2');
    expect(items[2]).toHaveTextContent('Option 3');

    items.forEach((item, index) => {
      expect(item).toHaveAttribute('aria-posinset', (index + 1).toString());
      expect(item).toHaveAttribute('aria-setsize', '3'); // Total items = 3
    });

    expect(items[0]).toHaveAttribute('tabIndex', '0'); // First item is focusable
    expect(items[1]).toHaveAttribute('tabIndex', '-1');
    expect(items[2]).toHaveAttribute('tabIndex', '-1');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <MenuList onClick={handleClick}>
        <li>Option 1</li>
        <li>Option 2</li>
      </MenuList>
    );

    const menu = screen.getByRole('menu', { name: /menu options/i });
    await user.click(menu);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports custom attributes passed via rest props', () => {
    render(
      <MenuList data-testid='custom-menu'>
        <li>Option 1</li>
      </MenuList>
    );

    const menu = screen.getByTestId('custom-menu');
    expect(menu).toBeInTheDocument();
  });
});
