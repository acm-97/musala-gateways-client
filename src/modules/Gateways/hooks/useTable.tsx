import { Link } from 'react-router-dom';
import React from 'react';

import { Gateway } from '@/services';
import { useGateways } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL } from '@/modules/Gateways/constants';
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
