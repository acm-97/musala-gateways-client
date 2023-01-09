import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ModalContext = createContext<any>({});

type dialogProps = {
  isOpen: boolean;
  dialogId?: string | null;
  payload?: any;
};

function ModalProvider(props: any) {
  const [dialog, setDialog] = useState<dialogProps>({ isOpen: false });

  const openDialog = useCallback((dialogId: string, payload: any) => {
    setDialog({ isOpen: true, dialogId, payload });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog({ isOpen: false, dialogId: null });
  }, []);

  const values = useMemo(() => ({ ...dialog, openDialog, closeDialog }), [closeDialog, dialog, openDialog]);

  return <ModalContext.Provider value={values} {...props} />;
}

function useModal(dialog: string) {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useDialogContext must be used within a ModalContextProvider');
  }

  const { openDialog, closeDialog, setOpen } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const openDialog = (payload: any) => context.openDialog(dialog, payload);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const closeDialog = () => context.closeDialog();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const setOpen = (value: any) => (value ? context.openDialog(dialog) : context.closeDialog());
    return { openDialog, closeDialog, setOpen };
  }, [context, dialog]);

  const isOpen = context.isOpen && context.dialog === dialog;

  try {
    return { openDialog, closeDialog, setOpen, isOpen, payload: context.payload };
  } catch (e) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      openDialog: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      closeDialog: () => {},
    };
  }
}

export { ModalProvider, useModal };
