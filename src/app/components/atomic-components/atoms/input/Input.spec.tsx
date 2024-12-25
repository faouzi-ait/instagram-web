import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './index';
import '@testing-library/jest-dom';

describe('InputField Component', () => {
  it('renders the input with the correct placeholder', () => {
    render(
      <InputField
        placeholder='Enter your name'
        testId='input-field'
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  it('applies the correct type attribute', () => {
    render(
      <InputField type='email' testId='input-field' onChange={() => {}} />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('updates value when provided', () => {
    render(
      <InputField value='Test Value' testId='input-field' onChange={() => {}} />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveValue('Test Value');
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<InputField testId='input-field' onChange={handleChange} />);

    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);

    const event = handleChange.mock.calls[0][0]; // Access the first call's first argument
    expect(event.target.value).toBe('New Value');
  });

  it('applies custom styles', () => {
    render(
      <InputField
        testId='input-field'
        style={{ backgroundColor: 'red' }}
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveStyle('background-color: red');
  });

  it('applies custom className', () => {
    render(
      <InputField
        testId='input-field'
        className='custom-class'
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveClass('custom-class');
  });

  it('sets required attribute when required is true', () => {
    render(<InputField testId='input-field' required onChange={() => {}} />);

    const input = screen.getByTestId('input-field');
    expect(input).toBeRequired();
  });

  it('disables input when disabled is true', () => {
    render(<InputField testId='input-field' disabled onChange={() => {}} />);

    const input = screen.getByTestId('input-field');
    expect(input).toBeDisabled();
  });

  it('uses the default aria-label when ariaLabel is not provided', () => {
    render(
      <InputField
        placeholder='Enter text'
        testId='input-field'
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveAttribute('aria-label', 'Enter text');
  });

  it('uses a custom aria-label when provided', () => {
    render(
      <InputField
        ariaLabel='Custom Aria Label'
        testId='input-field'
        onChange={() => {}}
      />
    );

    const input = screen.getByTestId('input-field');
    expect(input).toHaveAttribute('aria-label', 'Custom Aria Label');
  });

  //   it('spreads additional attributes', () => {
  //     render(
  //       <InputField
  //         testId="input-field"
  //         data-custom-attr="custom-value"
  //         onChange={() => {}}
  //       />
  //     );

  //     const input = screen.getByTestId('input-field');
  //     expect(input).toHaveAttribute('data-custom-attr', 'custom-value');
  //   });
});
