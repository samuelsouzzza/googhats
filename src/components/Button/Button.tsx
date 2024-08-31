'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import styles from './Button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faHourglass } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonProps = React.ComponentProps<'button'> & {
  text?: string;
  icon?: IconProp;
};

export const Button = ({
  children,
  type,
  text,
  icon,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={styles.button} {...props}>
      {text ? (
        text
      ) : pending ? (
        <FontAwesomeIcon icon={faHourglass} spin />
      ) : (
        <FontAwesomeIcon icon={icon ? icon : faPaperPlane} />
      )}
    </button>
  );
};
