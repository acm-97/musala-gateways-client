import axios from 'axios';

import { API_URL } from '@/constants';

const config = { headers: { 'Content-Type': 'application/json' } };

export async function getGateways() {
  const { data, status } = await axios.get(`${API_URL as string}/api/gateways`, config);

  return { data, status };
}
