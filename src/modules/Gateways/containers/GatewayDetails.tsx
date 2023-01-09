import { memo, useCallback } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

import { useGateways } from '@/modules/Gateways/hooks';
import { GATEWAY_MODAL, PERIPHERAL_MODAL } from '@/modules/Gateways/constants';
import { useModal } from '@/contexts';

// type GatewayDetailsProps = {};

const GatewayDetails = () => {
  const { data } = useGateways.useGetOneGateway();
  const { openDialog, setOpen } = useModal(GATEWAY_MODAL);

  const handleGatewayModal = useCallback(() => {
    setOpen && setOpen(true);
    openDialog(data);
  }, [data, openDialog, setOpen]);

  return (
    <>
      <p className="mb-3">
        <span className="opacity-70">Name: </span>
        {data?.name}
      </p>
      <p className="mb-3">
        <span className="opacity-70">IPv4 address: </span>
        {data?.ipv4_address}
      </p>
      <p className="mb-3">
        <span className="opacity-70">ID: </span>
        {data?._id}
      </p>

      <button
        type="button"
        data-modal-target={GATEWAY_MODAL}
        data-modal-toggle={GATEWAY_MODAL}
        className="btn mb-5"
        onClick={handleGatewayModal}
      >
        <PencilSquareIcon width={20} className="mr-2" /> Gateway
      </button>

      <button
        type="button"
        data-modal-target={PERIPHERAL_MODAL}
        data-modal-toggle={PERIPHERAL_MODAL}
        className="btn mb-5"
        onClick={}
      >
        <PencilSquareIcon width={20} className="mr-2" /> Gateway
      </button>
    </>
  );
};

export default memo(GatewayDetails);
