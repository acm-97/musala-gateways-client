import { memo } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import { GATEWAY_MODAL } from './constants';

import { Gateway } from '@/services';
import { useTable } from '@/modules/GatewaysTable/hooks';
import { Table } from '@/components';

// type GatewayTableProps = {};

const GatewaysTable = () => {
  const { rows, columns } = useTable();

  return (
    <main className=" min-h-[100vh] w-full px-52">
      <div className="mx-auto max-w-[1000px] py-28">
        <h2 className="mb-8">Gateway Management System</h2>
        <button type="button" data-modal-target={GATEWAY_MODAL} data-modal-toggle={GATEWAY_MODAL} className="btn mb-5">
          <PlusIcon width={20} className="mr-2" /> Gateway
        </button>
        <Table rows={rows} columns={columns} />
      </div>
    </main>
  );
};

export default memo(GatewaysTable);
