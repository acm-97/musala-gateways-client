import React, { memo, useRef, useCallback, ReactNode } from 'react';

type ModalProps = {
  id: string;
  onCancel?: () => void;
  onSave?: () => void;
  children: ReactNode;
};

function Modal({ id, onCancel, onSave, children }: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(() => {
    onSave && onSave();
    if (inputRef?.current?.checked) {
      inputRef.current.checked = false;
    }
  }, [onSave]);

  const handleCancel = useCallback(() => {
    onCancel && onCancel();
    if (inputRef?.current?.checked) {
      inputRef.current.checked = false;
    }
  }, [onCancel]);

  return (
    <>
      <input type="checkbox" id={id} ref={inputRef} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {children}
          <div className="modal-action">
            <button type="submit" className="btn" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Modal);
