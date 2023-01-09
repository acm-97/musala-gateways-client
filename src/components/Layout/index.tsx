import { Outlet } from 'react-router-dom';
import React, { memo } from 'react';

import { ReactQueryProvider } from '@/contexts';

const Layout = () => (
  <ReactQueryProvider>
    <Outlet />
  </ReactQueryProvider>
);

export default memo(Layout);
