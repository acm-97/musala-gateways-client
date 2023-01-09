/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useCallback, useRef, useMemo } from 'react';
import { Formik } from 'formik';

import { useGateways } from '../hooks';
import { GATEWAY_MODAL } from '../constants';

import { Gateway } from '@/services';
import { useModal } from '@/contexts';

// type AddGatewayModalProps = { gateway: Gateway | null };

const GatewayModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, add } = useGateways.useAddGateway();
  const { payload: gateway } = useModal(GATEWAY_MODAL);

  const initialValues = useMemo(
    () => ({
      name: gateway?.name || '',
      ipv4_address: gateway?.ipv4_address || '',
    }),
    [gateway],
  );

  const onSubmit = useCallback(
    async (values: any, { resetForm }: any) => {
      await add(values);
      if (!isLoading && inputRef?.current?.checked) {
        inputRef.current.checked = false;
        resetForm();
      }
    },
    [add, isLoading],
  );

  const handleCancel = useCallback(() => {
    if (inputRef?.current?.checked) {
      inputRef.current.checked = false;
    }
  }, []);

  return (
    <>
      <div
        id={GATEWAY_MODAL}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg  bg-gray-700 shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between rounded-t border-b border-gray-600 p-4">
              <h3 className="text-xl font-semibold text-white">New Gateway</h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                data-modal-hide={GATEWAY_MODAL}
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
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                          value={values.name}
                        />
                        <label
                          htmlFor="floating_phone"
                          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium  peer-focus:text-teal-400"
                        >
                          Name
                        </label>
                      </div>
                      <div className="group relative z-0 mb-6 w-full">
                        <input
                          type="text"
                          name="ipv4_address"
                          id="ipv4_address"
                          className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0  text-sm text-white  focus:border-teal-400 focus:outline-none focus:ring-0"
                          placeholder=" "
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ipv4_address}
                        />
                        <label
                          htmlFor="floating_company"
                          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium  peer-focus:text-teal-400"
                        >
                          IPv4 Address
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 rounded-b border-t  border-gray-600 p-6">
                    <button type="submit" className="btn" disabled={isLoading || isSubmitting}>
                      Save
                    </button>
                    <button type="button" className="btn" data-modal-hide={GATEWAY_MODAL} onClick={handleCancel}>
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

export default memo(GatewayModal);
