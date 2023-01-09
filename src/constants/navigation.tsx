import { GatewaysTable } from '@/modules';
import { Layout } from '@/components';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <GatewaysTable />,
      },
      {
        path: '/gateway/:id',
        element: <div />,
      },
    ],
  },
];
