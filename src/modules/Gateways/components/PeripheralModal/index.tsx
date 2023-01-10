/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useCallback, useRef, useMemo } from 'react';
import { Formik } from 'formik';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { usePeripherals } from '../../hooks';
import { PERIPHERAL_MODAL } from '../../constants';

import { useModal } from '@/contexts';
import { Button } from '@/components';

// type AddPeripheralModalProps = { peripheral: Peripheral | null };

const PeripheralModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, add } = usePeripherals.useAddPeripheral();
  const { payload, closeModal, setOpen } = useModal(PERIPHERAL_MODAL);

  const initialValues = useMemo(
    () => ({
      uid: payload?.uid || Math.trunc(Math.random() * 1000) + 1,
      vendor: payload?.vendor || '',
      status: payload?.status || 'online',
    }),
    [payload],
  );

  const onSubmit = useCallback(
    async (values: any, { resetForm }: any) => {
      await add({ gateway: payload?._id, ...values });
      if (!isLoading) {
        resetForm();
        closeModal();
        setOpen?.(false);
      }
    },
    [add, closeModal, isLoading, payload?._id, setOpen],
  );

  const handleCancel = useCallback(() => {
    if (!isLoading) {
      closeModal();
      setOpen?.(false);
    }
  }, [closeModal, isLoading, setOpen]);

  return (
    <>
      <div
        id={PERIPHERAL_MODAL}
        data-modal-target={PERIPHERAL_MODAL}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg  bg-gray-700 shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b border-gray-600 p-4">
              <h3 className="text-xl font-semibold text-white">{payload ? 'Edit' : 'New'} Peripheral</h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                onClick={handleCancel}
              >
                <XMarkIcon className="h-5 w-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mt-5 space-y-6 p-6 ">
                    <div className="grid md:grid-cols-2 md:gap-6 ">
                      <div className="group relative z-0 mb-6 w-full">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white  focus:border-teal-400 focus:outline-none focus:ring-0"
                          placeholder=" "
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.uid}
                        />
                        <label
                          htmlFor="floating_phone"
                          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium  peer-focus:text-teal-400"
                        >
                          UID
                        </label>
                      </div>
                      <div className="group relative z-0 mb-6 w-full">
                        <input
                          type="text"
                          name="vendor"
                          id="vendor"
                          className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white  focus:border-teal-400 focus:outline-none focus:ring-0"
                          placeholder=" "
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.vendor}
                        />
                        <label
                          htmlFor="floating_company"
                          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium  peer-focus:text-teal-400"
                        >
                          Vendor
                        </label>
                      </div>
                    </div>
                    <div className="group relative z-0 mb-6 w-full">
                      <label className="relative mb-4 inline-flex cursor-pointer items-center ">
                        <input
                          type="checkbox"
                          checked={values.status === 'online'}
                          value={values.status}
                          onChange={(e) => setFieldValue('status', e.target.checked ? 'online' : 'offline')}
                          className="peer sr-only"
                        />

                        <div className="peer h-6 w-11 rounded-full border-gray-600 bg-gray-400 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-teal-700" />
                        <span className="ml-3 text-sm font-medium text-gray-300">Offline / Online</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 p-6">
                    <Button
                      type="submit"
                      className=" bg-teal-600 hover:bg-teal-700 focus:ring-teal-700"
                      disabled={isLoading || isSubmitting}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PeripheralModal);
