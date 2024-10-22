// components/Modal.tsx
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './page.module.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!show || !isMounted) {
    return null;
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.overlay} onClick={handleCloseClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <span style={{ color: 'white' }}>&times;</span>
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById('modal-root')!);
};

export default Modal;
