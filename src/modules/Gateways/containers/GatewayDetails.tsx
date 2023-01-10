import { memo, useCallback } from 'react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';

import { useGateways, useTablePeripherals } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL, PERIPHERAL_MODAL } from '@/modules/Gateways/constants';
import { useModal } from '@/contexts';
import { Button, Table } from '@/components';

// type GatewayDetailsProps = {};

const GatewayDetails = () => {
  const { data } = useGateways.useGetOneGateway();
  const { openModal } = useModal(GATEWAY_MODAL);
  const { openModal: openPeripherals } = useModal(PERIPHERAL_MODAL);
  const { rows, columns } = useTablePeripherals();

  const handleGatewayModal = useCallback(() => {
    openModal(data);
  }, [data, openModal]);

  const handlePeripheralsModal = useCallback(() => {
    openPeripherals(data);
  }, [data, openPeripherals]);

  return (
    <>
      <p className="mb-3">
        <span className="opacity-70">Name : </span>
        {data?.name}
      </p>
      <p className="mb-3">
        <span className="opacity-70">IPv4 address : </span>
        {data?.ipv4_address}
      </p>
      <p className="mb-3">
        <span className="opacity-70">Serial Number : </span>
        {data?._id}
      </p>

      <Button className="btn mb-6 mr-3" onClick={handleGatewayModal}>
        <PencilSquareIcon width={16} className="mr-2" /> Gateway
      </Button>

      <Button className="btn mb-6" onClick={handlePeripheralsModal}>
        <PlusIcon width={16} className="mr-2" /> Peripheral
      </Button>

      <Table rows={rows} columns={columns} />
    </>
  );
};

export default memo(GatewayDetails);
