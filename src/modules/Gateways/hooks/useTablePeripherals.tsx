import { Link } from 'react-router-dom';
import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

import { CONFIRM_MODAL, PERIPHERAL_MODAL } from '../constants';

import { Peripheral } from '@/services';
import { usePeripherals } from '@/modules/Gateways/hooks';
import { useModal } from '@/contexts';
import { ColumnsProps } from '@/components/Table';

const useTable = () => {
  const { data } = usePeripherals.useGetPeripherals();
  const { remove } = usePeripherals.useRemovePeripheral();
  const { openModal, setOpen } = useModal(PERIPHERAL_MODAL);
  const { openModal: openConfirm, setOpen: setOpenConfirm } = useModal(CONFIRM_MODAL);

  const handleEdit = (values: Peripheral) => {
    setOpen?.(true);
    openModal(values);
  };

  const handleRemove = ({ _id, uid }: Peripheral) => {
    setOpenConfirm?.(true);
    openConfirm({
      message: () => (
        <span>
          Are you sure you want to remove gateway with UID <span className="text-teal-300">{uid}</span>
        </span>
      ),
      _id,
      onSave: remove,
    });
  };

  const rows: any[] = data?.data || [];
  const columns: ColumnsProps[] = [
    {
      headerName: '',
      headerCellProps: { className: 'w-4' },
      accessor: (values: Peripheral) => (
        <div className="flex">
          <TrashIcon width={16} className="mr-4 hover:cursor-pointer " onClick={() => handleRemove(values)} />
          <PencilSquareIcon width={16} className="hover:cursor-pointer" onClick={() => handleEdit(values)} />
        </div>
      ),
    },
    { headerName: 'Vendor', accessor: 'vendor' },
    { headerName: 'UID', accessor: 'uid' },
    {
      headerName: 'Status',
      accessor: ({ status }: Peripheral) => (
        <span
          className={
            status === 'online'
              ? 'rounded-xl bg-teal-400 px-2 py-1 font-semibold'
              : 'rounded-xl bg-gray-400 px-2 py-1 font-semibold'
          }
        >
          {status}
        </span>
      ),
    },
    {
      headerName: 'Date Created',
      accessor: ({ createdAt }: Peripheral) =>
        new Date(createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'short' }).replace(' ', ', '),
    },
  ];

  return { rows, columns };
};

export default useTable;
