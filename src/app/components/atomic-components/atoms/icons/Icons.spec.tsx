import React from 'react';
import { render, screen } from '@testing-library/react';
import iconMap from './iconMap';
import Icon from './index';

describe('Icon Component', () => {
  it('renders the trash icon correctly', async () => {
    Object.keys(iconMap).forEach(async (key) => {
      render(
        <Icon
          name={iconMap[key as keyof typeof iconMap] as keyof typeof iconMap}
          size={32}
          color='red'
          testId={key}
        />
      );
      const iconSvg = await screen.findByTestId(key);
      expect(iconSvg).toBeInTheDocument();
    });
  });

  it('renders nothing if an invalid icon name is provided', () => {
    const { container } = render(
      <Icon name={'invalidIcon' as keyof typeof iconMap} />
    );
    expect(container.firstChild).toBeNull();
  });
});
