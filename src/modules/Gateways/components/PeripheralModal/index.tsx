/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useCallback, useRef, useMemo } from 'react';
import { Formik } from 'formik';

import { usePeripherals } from '../../hooks';
import { PERIPHERAL_MODAL } from '../../constants';

import { Peripheral } from '@/services';
import { useModal } from '@/contexts';

// type AddPeripheralModalProps = { peripheral: Peripheral | null };

const PeripheralModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, add } = usePeripherals.useAddPeripheral();
  const { payload, closeDialog } = useModal(PERIPHERAL_MODAL);

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
        closeDialog();
        resetForm();
      }
    },
    [add, closeDialog, isLoading, payload?._id],
  );

  const handleCancel = useCallback(() => {
    if (!isLoading) {
      closeDialog();
    }
  }, [closeDialog, isLoading]);

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
                data-modal-hide={PERIPHERAL_MODAL}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 p-6">
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

                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-teal-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-teal-800" />
                        <span className="ml-3 text-sm font-medium text-gray-300">Offline / Online</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 rounded-b border-t  border-gray-600 p-6">
                    <button
                      type="submit"
                      className="btn"
                      data-modal-hide={PERIPHERAL_MODAL}
                      disabled={isLoading || isSubmitting}
                    >
                      Save
                    </button>
                    <button type="button" className="btn" data-modal-hide={PERIPHERAL_MODAL} onClick={handleCancel}>
                      Cancel
                    </button>
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
