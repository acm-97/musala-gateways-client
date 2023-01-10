import { Link } from 'react-router-dom';
import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

import { Gateway } from '@/services';
import { useGateways } from '@/modules/Gateways/hooks';
import { CONFIRM_MODAL, GATEWAY_MODAL } from '@/modules/Gateways/constants';
import { useModal } from '@/contexts';
import { ColumnsProps } from '@/components/Table';

// type UseTableProps = {
//   setSelected: (value: Gateway) => void;
//   modalRef: any;
// };

const useTable = () => {
  const { data } = useGateways.useGetGateways();
  const { remove } = useGateways.useRemoveGateway();
  const { openModal, setOpen } = useModal(GATEWAY_MODAL);
  const { openModal: openConfirm, setOpen: setOpenConfirm } = useModal(CONFIRM_MODAL);

  const handleEdit = (values: Gateway) => {
    setOpen?.(true);
    openModal(values);
  };

  const handleRemove = ({ _id }: Gateway) => {
    setOpenConfirm?.(true);
    openConfirm({
      message: () => (
        <span>
          Are you sure you want to remove gateway with serial nummber <span className="text-teal-300">{_id}</span>
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
      accessor: (values: Gateway) => (
        <div className="flex">
          <TrashIcon width={16} className="mr-4 hover:cursor-pointer " onClick={() => handleRemove(values)} />
          <PencilSquareIcon width={16} className="hover:cursor-pointer" onClick={() => handleEdit(values)} />
        </div>
      ),
    },
    {
      headerName: 'Name',
      accessor: 'name',
    },
    {
      headerName: 'Serial Number',
      accessor: ({ _id }: Gateway) => <Link to={`/gateway/${_id}`}> {_id} </Link>,
    },
    { headerName: 'IPv4 Address', accessor: 'ipv4_address' },
  ];

  return { rows, columns };
};

export default useTable;
