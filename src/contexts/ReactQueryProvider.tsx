import { QueryClient, QueryClientProvider } from 'react-query';
import React, { memo, ReactNode } from 'react';

type ReactQueryProviderProps = { children: ReactNode };

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default memo(ReactQueryProvider);
