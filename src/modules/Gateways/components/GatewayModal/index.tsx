/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, useCallback, useMemo, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useGateways } from '../../hooks';
import { GATEWAY_MODAL } from '../../constants';

import { useModal } from '@/contexts';
import { Alert, Button } from '@/components';

// type AddGatewayModalProps = { gateway: Gateway | null };

const GatewayModal = () => {
  const { isLoading: isAdding, add } = useGateways.useAddGateway();
  const { isLoading: isUpdating, update } = useGateways.useUpdateGateway();
  const { payload, closeModal, setOpen } = useModal(GATEWAY_MODAL);
  const [error, setError] = useState('');

  const isLoading = useMemo(() => isAdding || isUpdating, [isAdding, isUpdating]);

  const initialValues = useMemo(
    () => ({
      name: payload?.name || '',
      ipv4_address: payload?.ipv4_address || '',
    }),
    [payload],
  );

  const onSubmit = useCallback(
    async (values: any, { resetForm, setErrors }: any) => {
      try {
        setError('');
        !payload ? await add(values) : await update({ _id: payload._id, ...values });
        if (!isLoading) {
          resetForm();
          closeModal();
          setOpen && setOpen(false);
        }
      } catch (err: any) {
        if (err?.response?.data && typeof err.response.data === 'string') {
          setError(err.response.data);
        }

        setErrors(err.response.data.errors);
      }
    },
    [add, closeModal, isLoading, payload, setOpen, update],
  );

  const handleCancel = useCallback(
    (resetForm: any) => {
      if (!isLoading) {
        setError('');
        closeModal();
        setOpen && setOpen(false);
        resetForm();
      }
    },
    [closeModal, isLoading, setOpen],
  );

  return (
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
            <h3 className="text-xl font-semibold text-white">{payload ? 'Edit' : 'New'} Gateway</h3>
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
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
              <form onSubmit={handleSubmit}>
                {error && <Alert> {error} </Alert>}
                <div className="mt-5 space-y-6 p-6">
                  <div className="grid md:grid-cols-2 md:gap-6 ">
                    <div className="group relative z-0 mb-6 w-full">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="peer mb-3 block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5  px-0 text-sm  text-white focus:border-teal-300 focus:outline-none focus:ring-0"
                        placeholder=" "
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
                      <ErrorMessage
                        name="name"
                        render={({ message }: any) => <span className="text-sm text-red-500">{message}</span>}
                      />
                    </div>
                    <div className="group relative z-0 mb-6 w-full">
                      <input
                        type="text"
                        name="ipv4_address"
                        id="ipv4_address"
                        className="peer mb-3 block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5  px-0 text-sm  text-white focus:border-teal-400 focus:outline-none focus:ring-0"
                        placeholder=" "
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
                      <ErrorMessage
                        name="ipv4_address"
                        render={({ message }: any) => <span className="text-sm text-red-500">{message}</span>}
                      />
                    </div>
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
                  <Button type="button" onClick={() => handleCancel(resetForm)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default memo(GatewayModal);
