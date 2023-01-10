import { Link } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

import { useGateways, useTablePeripherals } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL, PERIPHERAL_MODAL } from '@/modules/Gateways/constants';
import { useModal } from '@/contexts';
import { Button, Table } from '@/components';

// type GatewayDetailsProps = {};

const GatewayDetails = () => {
  const { data } = useGateways.useGetOneGateway();
  const { openModal, setOpen } = useModal(GATEWAY_MODAL);
  const { openModal: openPeripheral, setOpen: setOpenPeripheral } = useModal(PERIPHERAL_MODAL);
  const { rows, columns } = useTablePeripherals(data?.peripheralsDevices);

  const handleGatewayModal = useCallback(() => {
    setOpen?.(true);
    openModal(data);
  }, [data, openModal, setOpen]);

  const handlePeripheralsModal = useCallback(() => {
    setOpenPeripheral?.(true);
    openPeripheral({ gateway: data._id });
  }, [data, openPeripheral, setOpenPeripheral]);

  return (
    <>
      <Link to="/" className="before:hidden">
        <ArrowLeftCircleIcon width={40} />
      </Link>
      <p className="mb-3 mt-8 text-gray-400">
        Name : <span className="font-bold text-white">{data?.name}</span>
      </p>
      <p className="mb-3 text-gray-400">
        IPv4 address : <span className="font-bold text-white">{data?.ipv4_address}</span>
      </p>
      <p className="mb-3 text-gray-400">
        Serial Number : <span className="font-bold text-white">{data?._id}</span>
      </p>

      <Button className="mb-6 mr-3" onClick={handleGatewayModal}>
        <PencilSquareIcon width={16} className="mr-2" /> Gateway
      </Button>

      <Button className="mb-6" onClick={handlePeripheralsModal}>
        <PlusIcon width={16} className="mr-2" /> Peripheral
      </Button>

      <Table rows={rows} columns={columns} />
    </>
  );
};

export default memo(GatewayDetails);
