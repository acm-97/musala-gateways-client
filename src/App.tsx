import React from 'react';

import { GatewaysTable } from './modules';

import { ReactQueryProvider } from '@/contexts';

function App() {
  return (
    <ReactQueryProvider>
      <GatewaysTable />
    </ReactQueryProvider>
  );
}

export default App;
