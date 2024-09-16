import React, { useRef, useEffect } from 'react';
import "./CSS/Modal.css"

const Dialog = ({ title, children, isOpen, onClose }) => {
  const dialogRef = useRef(null);

    useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen])

  return (
    <dialog ref={dialogRef} className="custom-dialog" onClose={onClose}>
    <h2>{title}</h2>
    <div>
      {children}
    </div>
    <button onClick={onClose}>Fechar</button>
  </dialog>
  );
};

export default Dialog;
