import { Outlet } from 'react-router-dom';
import React, { memo } from 'react';

import { GatewayModal, PeripheralModal } from '@/modules/Gateways/components';
import { ModalProvider, ReactQueryProvider } from '@/contexts';
import { ConfirmModal } from '@/components';

const Layout = () => (
  <ReactQueryProvider>
    <ModalProvider>
      <main className="min-h-[100vh] w-full px-52 max-lg:px-20 max-sm:px-6">
        <div className="mx-auto max-w-[1000px] py-28">
          <Outlet />
        </div>
      </main>

      <GatewayModal />
      <PeripheralModal />
      <ConfirmModal />
    </ModalProvider>
  </ReactQueryProvider>
);

export default memo(Layout);
