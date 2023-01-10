import React, { memo, useCallback } from 'react';
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { CONFIRM_MODAL } from '../../modules/Gateways/constants';

import { useModal } from '@/contexts';
import { Button } from '@/components';

// type ModalProps = {
//   id: string;
//   onCancel?: () => void;
//   onSave?: () => void;
//   children: ReactNode;
// };

function Modal() {
  const { payload, closeModal, setOpen } = useModal(CONFIRM_MODAL);

  const handleSave = useCallback(() => {
    payload?.onSave(payload?._id);
    closeModal();
    setOpen?.(false);
  }, [closeModal, payload, setOpen]);

  const handleCancel = useCallback(() => {
    closeModal();
    setOpen?.(false);
  }, [closeModal, setOpen]);

  return (
    <div
      id={CONFIRM_MODAL}
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50 hidden h-modal overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
    >
      <div className="relative h-full w-full max-w-md md:h-auto">
        <div className="flex flex-col items-end justify-end rounded-lg bg-gray-700  shadow dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
            onClick={handleCancel}
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-orange-400 hover:text-orange-400" />

            <div className="mb-5 text-lg font-normal ">
              {typeof payload?.message === 'function' ? payload?.message() : payload?.message}
            </div>
            <Button className=" bg-teal-600 hover:bg-teal-800 focus:ring-teal-800" onClick={handleSave}>
              Yes, I'm sure
            </Button>
            <Button className="mr-2" onClick={handleCancel}>
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
