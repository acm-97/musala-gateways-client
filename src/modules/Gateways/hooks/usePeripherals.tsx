import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useCallback, useMemo } from 'react';

import { Peripheral, PeripheralsService } from '@/services';
import { CACHE_KEY_PERIPHERAL_LIST, CACHE_KEY_PERIPHERAL } from '@/modules/Gateways/constants';

export const useGetPeripherals = () => {
  const { isLoading, data } = useQuery(CACHE_KEY_PERIPHERAL_LIST, PeripheralsService.getAll);

  return { isLoading, data };
};

export const useAddPeripheral = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(PeripheralsService.add, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CACHE_KEY_PERIPHERAL_LIST);
    },
  });

  const add = useCallback(
    async (params: Peripheral) => {
      await mutateAsync(params);
    },
    [mutateAsync],
  );

  return { isLoading, add };
};

export const useUpdatePeripheral = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(PeripheralsService.update, {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(CACHE_KEY_PERIPHERAL_LIST);
      await queryClient.invalidateQueries(CACHE_KEY_PERIPHERAL);
      await queryClient.invalidateQueries(data && data._id ? data._id : CACHE_KEY_PERIPHERAL);
    },
  });

  const update = useCallback(
    async (params: Peripheral) => {
      await mutateAsync(params);
    },
    [mutateAsync],
  );

  return { isLoading, update };
};

export const useRemovePeripheral = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(PeripheralsService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CACHE_KEY_PERIPHERAL_LIST);
      await queryClient.invalidateQueries(CACHE_KEY_PERIPHERAL);
    },
  });

  const remove = useCallback(
    async (id: string) => {
      await mutateAsync(id);
    },
    [mutateAsync],
  );

  return { isLoading, remove };
};
