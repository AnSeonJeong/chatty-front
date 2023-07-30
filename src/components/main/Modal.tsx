import React from "react";
import "../../../styles/modal.scss";

const Modal = ({
  visible,
  title,
  description,
  onCancel,
  onConfirm,
  id,
}: ModalProps) => {
  const confirmText = "확인";
  const cancelText = "취소";

  if (!visible) return null;
  return (
    <div className="full_screen">
      <div className="modalBlock">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <button className="modalBtn" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="modalBtn" onClick={() => onConfirm(id)}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
