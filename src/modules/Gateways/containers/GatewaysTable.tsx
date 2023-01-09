import { memo } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import { useTable } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL } from '@/modules/Gateways/constants';
import { Table } from '@/components';

// type GatewayTableProps = {};

const GatewaysTable = () => {
  const { rows, columns } = useTable();

  return (
    <>
      <h2 className="mb-8">Gateway Management System</h2>
      <button type="button" data-modal-target={GATEWAY_MODAL} data-modal-toggle={GATEWAY_MODAL} className="btn mb-5">
        <PlusIcon width={20} className="mr-2" /> Gateway
      </button>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default memo(GatewaysTable);
