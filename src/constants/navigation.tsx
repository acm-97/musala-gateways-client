import { GatewayDetails, GatewaysTable } from '@/modules';
import { Layout, PageErrors } from '@/components';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <PageErrors />,
    children: [
      {
        path: '',
        element: <GatewaysTable />,
      },
      {
        path: '/gateway/:id',
        element: <GatewayDetails />,
      },
    ],
  },
];
