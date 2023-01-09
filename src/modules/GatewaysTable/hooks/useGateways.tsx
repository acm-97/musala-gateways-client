import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useCallback } from 'react';

import { Gateway, GatewaysService } from '@/services';
import { CACHE_KEY_GATEWAY_LIST, CACHE_KEY_GATEWAY } from '@/modules/GatewaysTable/constants';

export const useGetGateways = () => {
  const { isLoading, data } = useQuery(CACHE_KEY_GATEWAY_LIST, GatewaysService.getAll);

  return { isLoading, data };
};

export const useGetOneGateway = (id: string) => {
  const { isLoading, data } = useQuery(CACHE_KEY_GATEWAY, async () => {
    const { data: result } = await GatewaysService.getOne(id);
    return result;
  });

  return { isLoading, data };
};

export const useAddGateway = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(GatewaysService.add, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CACHE_KEY_GATEWAY_LIST);
    },
  });

  const add = useCallback(
    async (params: Gateway) => {
      await mutateAsync(params);
    },
    [mutateAsync],
  );

  return { isLoading, add };
};

export const useUpdateGateway = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(GatewaysService.update, {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(CACHE_KEY_GATEWAY_LIST);
      await queryClient.invalidateQueries(CACHE_KEY_GATEWAY);
      await queryClient.invalidateQueries(data && data._id ? data._id : CACHE_KEY_GATEWAY);
    },
  });

  const update = useCallback(
    async (params: Gateway) => {
      await mutateAsync(params);
    },
    [mutateAsync],
  );

  return { isLoading, update };
};

export const useRemoveGateway = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(GatewaysService.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(CACHE_KEY_GATEWAY_LIST);
      await queryClient.invalidateQueries(CACHE_KEY_GATEWAY);
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
