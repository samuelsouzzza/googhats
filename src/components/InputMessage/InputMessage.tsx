'use client';
import React from 'react';
import styles from './InputMessage.module.css';

type InputMessageProps = React.ComponentProps<'input'> & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const InputMessage = ({
  value,
  setValue,
  ...props
}: InputMessageProps) => {
  const refInputMessage = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const input = refInputMessage.current as HTMLInputElement;
    input?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={styles.container}>
      <input
        ref={refInputMessage}
        className={styles.input}
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  );
};
