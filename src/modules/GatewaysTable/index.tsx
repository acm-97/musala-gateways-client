import { memo } from 'react';

import { useTable } from '@/modules/GatewaysTable/hooks';
import { Table } from '@/components';

// type GatewayTableProps = {};

const GatewaysTable = () => {
  const { rows, columns } = useTable();

  return (
    <main className=" min-h-[100vh] w-full px-52">
      <div className="mx-auto max-w-[1000px] py-28">
        <h2 className="mb-10">Gateway Management System</h2>
        <Table rows={rows} columns={columns} tableRowBodyProps={{ onClick: () => alert('asd') }} />
      </div>
    </main>
  );
};

export default memo(GatewaysTable);
