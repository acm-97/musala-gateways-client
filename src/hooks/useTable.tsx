import { ColumnsProps } from '@/components/Table';

const useTable = () => {
  const rows: any[] = [];
  const columns: ColumnsProps[] = [];

  return { rows, columns };
};

export default useTable;
