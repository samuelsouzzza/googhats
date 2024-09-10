'use client';
import React from 'react';
import styles from './ModalActions.module.css';
import { Button } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { UseGlobalContext } from '@/globals/GlobalContext';

export const ModalActions = () => {
  const { modalActions, setModalActions } = UseGlobalContext();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${styles.container} fadeIn`}>
          <FontAwesomeIcon icon={modalActions?.icon as IconDefinition} />
          <p>{modalActions?.message}</p>
          {modalActions?.type === 'ok' ? (
            <Button
              text='Ok'
              className={`${styles.button}`}
              onClick={() => modalActions?.onOk()}
            />
          ) : (
            <div className={styles.boxButtons}>
              <Button
                text='Sim'
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={() => modalActions?.onOk()}
              />
              <Button
                text='Não'
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setModalActions(null)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
