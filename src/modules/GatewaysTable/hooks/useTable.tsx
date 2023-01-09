import { useGateways } from '@/modules/GatewaysTable/hooks';
import { ColumnsProps } from '@/components/Table';

const useTable = () => {
  const { data } = useGateways.useGetGateways();

  const rows: any[] = data?.data || [];
  const columns: ColumnsProps[] = [
    { headerName: 'Name', accessor: 'name' },
    { headerName: 'Serial Number', accessor: '_id' },
    { headerName: 'IPv4 Address', accessor: 'ipv4_address' },
  ];

  return { rows, columns };
};

export default useTable;
