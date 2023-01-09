import { memo } from 'react';

import { useGateways, useTable } from '@/hooks';
import { Table } from '@/components';

// type GatewayTableProps = {};

const GatewaysTable = () => {
  const { rows, columns } = useTable();
  const { data } = useGateways();
  console.log('🚀 ~ file: index.tsx:11 ~ GatewaysTable ~ data', data);

  return (
    <main className=" min-h-[100vh] w-full px-52">
      <div className="mx-auto max-w-[1000px] py-28">
        <Table rows={rows} columns={columns} />
      </div>
    </main>
  );
};

export default memo(GatewaysTable);
