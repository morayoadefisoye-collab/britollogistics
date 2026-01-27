import { createPortal } from 'react-dom';
import { useEffect } from 'react';

function ModalPortal({ children }) {
  const modalRoot = document.body;

  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(children, modalRoot);
}

export default ModalPortal;
