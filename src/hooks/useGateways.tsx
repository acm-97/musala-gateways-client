import { useQuery, useMutation } from 'react-query';

import { getGateways } from '@/services';
import { GATEWAYS } from '@/modules/GatewaysTable/constants';

const useGateways = () => {
  const { isLoading, data } = useQuery(GATEWAYS, getGateways);

  return { isLoading, data };
};

export default useGateways;
