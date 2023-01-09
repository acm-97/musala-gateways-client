import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import { GATEWAY_MODAL } from '../constants';

import { Gateway } from '@/services';
import { useGateways } from '@/modules/GatewaysTable/hooks';
import { useModal } from '@/contexts';
import { ColumnsProps } from '@/components/Table';

// type UseTableProps = {
//   setSelected: (value: Gateway) => void;
//   modalRef: any;
// };

const useTable = () => {
  const { data } = useGateways.useGetGateways();
  const { openDialog } = useModal(GATEWAY_MODAL);

  const rows: any[] = data?.data || [];
  const columns: ColumnsProps[] = [
    { headerName: 'Name', accessor: 'name' },
    {
      headerName: 'Serial Number',
      accessor: ({ _id }: Gateway) => (
        <Link reloadDocument to={`/gateway/${_id}`}>
          {' '}
          {_id}{' '}
        </Link>
      ),
    },
    { headerName: 'IPv4 Address', accessor: 'ipv4_address' },
  ];

  return { rows, columns };
};

export default useTable;
