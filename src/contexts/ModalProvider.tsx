import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Modal } from 'flowbite';

const ModalContext = createContext<any>({});

type ModalProps = {
  isOpen: boolean;
  modalId?: string | null;
  payload?: any;
};

function ModalProvider(props: any) {
  const [modal, setModal] = useState<ModalProps>({ isOpen: false });
  const [modalInstance, setModalInstance] = useState<any>();

  const openModal = useCallback((modalId: string, payload: any) => {
    setModal({ isOpen: true, modalId, payload });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, modalId: null });
  }, []);

  const saveModalInstance = useCallback((instance: HTMLElement | null) => {
    setModalInstance(instance);
  }, []);

  const values = useMemo(
    () => ({ ...modal, openModal, closeModal, modalInstance, saveModalInstance }),
    [closeModal, saveModalInstance, modal, modalInstance, openModal],
  );

  return <ModalContext.Provider value={values} {...props} />;
}

function useModal(modalId: string) {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }

  // const [modal, setModal] = useState<any>();
  // useEffect(() => {
  //   const $targetEl: HTMLElement | null = document.querySelector(`#${Modal}`);

  //   // options with default values
  //   const options = {};
  //   setModal(new Modal($targetEl, options));
  // }, [Modal]);

  // useEffect(() => {
  //   const $targetEl: HTMLElement | null = document.querySelector(`#${modalId}`);
  //   context.setModalInstance(new Modal($targetEl, {}));
  // }, [modalId]);

  const { openModal, closeModal, setOpen } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const openModal = (payload: any) => context.openModal(modalId, payload);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const closeModal = () => context.closeModal();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const setOpen = (value: any) => {
      if (value) {
        context.openModal(modalId);
        const $targetEl: HTMLElement | null = document.querySelector(`#${modalId}`);
        const modalInstance = new Modal($targetEl, {});
        modalInstance.show();
        context.saveModalInstance(modalInstance);
      } else {
        context.modalInstance.hide();
        context.closeModal();
      }
    };

    return { openModal, closeModal, setOpen };
  }, [context, modalId]);

  const isOpen = context.isOpen && context.Modal === Modal;

  try {
    return { openModal, closeModal, setOpen, isOpen, payload: context.payload, modal: context.modalInstance };
  } catch (e) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      openModal: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      closeModal: () => {},
    };
  }
}

export { ModalProvider, useModal };
