import React from 'react';

type MessageProps = {
  condition: boolean;
  text: string;
  isError?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
};

const Message: React.FC<MessageProps> = ({
  condition,
  text,
  isError = false,
  'aria-live': ariaLive = 'polite',
  ...rest
}) => {
  if (!condition) {
    return null;
  }

  const color = isError ? 'red' : 'green';

  return (
    <p
      style={{
        color,
        fontWeight: 'bold',
      }}
      role='alert'
      aria-live={ariaLive}
      {...rest}
    >
      {text}
    </p>
  );
};

export default Message;
