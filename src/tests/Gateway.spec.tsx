/* eslint-disable import/no-extraneous-dependencies */

import { describe, test, expect, vi, beforeAll, afterAll } from 'vitest';
import { render } from '@testing-library/react';

import { Gateway, GatewaysService, PeripheralsService } from '@/services';
import { GatewaysTable } from '@/modules';
import { ReactQueryProvider } from '@/contexts';

const gateway = { name: 'jest-test-gateway', ipv4_address: '255.255.255.1' };
const peripheral = { uid: Math.trunc(Math.random() * 1000) + 1, vendor: 'jest-test-device', status: 'online' };

describe('Gateway modules', () => {
  let gates: any = null;
  // @ts-ignore
  let lastGate: Gateway = null;
  beforeAll(async () => {
    // @ts-ignore
    await GatewaysService.add(gateway);
    gates = await GatewaysService.getAll();
    lastGate = gates?.data?.slice(-1)[0];

    // @ts-ignore
    await PeripheralsService.add({ gateway: lastGate?._id, ...peripheral });
    gates = await GatewaysService.getAll();
  });

  afterAll(async () => {
    await GatewaysService.remove(lastGate?._id);
  });

  test('Should show gateways view', () => {
    const { container, getByTestId, getByText } = render(
      <ReactQueryProvider>
        <GatewaysTable />
      </ReactQueryProvider>,
    );

    const header = getByText('Gateway Management System');
    expect(header).toBeInTheDocument();
    expect(header).toBeVisible();

    const addButton = getByTestId('add-gateway-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeVisible();

    const table = getByTestId('table');
    expect(table).toBeInTheDocument();
    expect(table).toBeVisible();

  });
});
