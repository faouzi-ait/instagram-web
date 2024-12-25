import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from './index';

describe('MainLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <MainLayout>
        <div>Child Content</div>
      </MainLayout>
    );

    const childContent = screen.getByText('Child Content');
    expect(childContent).toBeInTheDocument();
  });

  it('applies the default aria-label', () => {
    render(
      <MainLayout>
        <div>Content with Default Aria</div>
      </MainLayout>
    );

    const mainElement = screen.getByRole('main', { name: 'Main content area' });
    expect(mainElement).toBeInTheDocument();
  });

  it('applies a custom aria-label when provided', () => {
    render(
      <MainLayout ariaLabel='Custom Label'>
        <div>Content with Custom Aria</div>
      </MainLayout>
    );

    const mainElement = screen.getByRole('main', { name: 'Custom Label' });
    expect(mainElement).toBeInTheDocument();
  });

  it('applies additional HTML attributes via ...rest', () => {
    render(
      <MainLayout data-testid='main-layout'>
        <div>Content with Data Test ID</div>
      </MainLayout>
    );

    const mainElement = screen.getByTestId('main-layout');
    expect(mainElement).toBeInTheDocument();
  });
});
