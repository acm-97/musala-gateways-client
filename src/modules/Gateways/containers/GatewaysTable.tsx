import React, { memo } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

import { useTable } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL } from '@/modules/Gateways/constants';
import { useModal } from '@/contexts';
import { Button, Table } from '@/components';
// type GatewayTableProps = {};

const GatewaysTable = () => {
  const { rows, columns } = useTable();
  const { setOpen } = useModal(GATEWAY_MODAL);

  const openModal = () => setOpen && setOpen(true);

  return (
    <>
      <h2 className="mb-8">Gateway Management System</h2>
      <Button onClick={openModal} className="btn mb-5">
        <PlusIcon width={20} className="mr-2" /> Gateway
      </Button>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default memo(GatewaysTable);
