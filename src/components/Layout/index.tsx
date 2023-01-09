import { Outlet } from 'react-router-dom';
import React, { memo } from 'react';

import { GatewayModal, PeripheralModal } from '@/modules/Gateways/components';
import { ModalProvider, ReactQueryProvider } from '@/contexts';

const Layout = () => (
  <ReactQueryProvider>
    <ModalProvider>
      <main className=" min-h-[100vh] w-full px-52">
        <div className="mx-auto max-w-[1000px] py-28">
          <Outlet />
        </div>
      </main>

      <GatewayModal />
      <PeripheralModal />
    </ModalProvider>
  </ReactQueryProvider>
);

export default memo(Layout);
