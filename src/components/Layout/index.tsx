import { Outlet } from 'react-router-dom';
import React, { memo } from 'react';

import { AddGatewayModal } from '@/modules/GatewaysTable/containers';
import { ModalProvider, ReactQueryProvider } from '@/contexts';

const Layout = () => (
  <ReactQueryProvider>
    <ModalProvider>
      <Outlet />
      <AddGatewayModal />
    </ModalProvider>
  </ReactQueryProvider>
);

export default memo(Layout);
