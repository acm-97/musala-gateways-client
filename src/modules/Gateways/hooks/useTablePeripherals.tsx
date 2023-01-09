import { Link } from 'react-router-dom';
import React from 'react';

import { Peripheral } from '@/services';
import { usePeripherals } from '@/modules/Gateways/hooks';
import { ColumnsProps } from '@/components/Table';

const useTable = () => {
  const { data } = usePeripherals.useGetPeripherals();

  const rows: any[] = data?.data || [];
  const columns: ColumnsProps[] = [
    { headerName: 'UID', accessor: 'uid' },
    { headerName: 'Vendor', accessor: 'vendor' },
    { headerName: 'Status', accessor: 'status' },
    {
      headerName: 'Date Created',
      accessor: ({ createdAt }: Peripheral) =>
        new Date(createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'short' }),
    },
  ];

  return { rows, columns };
};

export default useTable;
