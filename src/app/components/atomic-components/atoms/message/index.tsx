type MessageProps = {
  condition: any;
  text: string;
  isError?: boolean;
};

const Message = ({
  condition,
  text,
  isError = false,
  ...rest
}: MessageProps) => {
  const color = `${isError ? 'red' : 'green'}`;
  return (
    condition && (
      <p
        style={{
          color: color,
          fontWeight: 'bold',
        }}
        {...rest}
      >
        {text}
      </p>
    )
  );
};

export default Message;
