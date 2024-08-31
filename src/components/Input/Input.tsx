'use client';
import React from 'react';
import styles from './Input.module.css';

type InputProps = React.ComponentProps<'input'> & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Input = ({ value, setValue, ...props }: InputProps) => {
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
