/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { Peripheral } from './peripheral.service';

import { API_URL } from '@/constants';

const config = { headers: { 'Content-Type': 'application/json' } };

export type Gateway = {
  _id: string;
  name: string;
  ipv4_address: string;
  peripherals_devices: Peripheral[];
};

class GatewaysService {
  getAll = async () => {
    const { data, status } = await axios.get(`${API_URL as string}/api/gateways`, config);

    return { data, status };
  };

  getOne = async (id: string) => {
    const { data, status } = await axios.get(`${API_URL as string}/api/gateway/${id}`, config);

    return { data, status };
  };

  add = async (body: Gateway) => {
    const { data, status } = await axios.post(`${API_URL as string}/api/gateway`, body, config);

    return { data, status };
  };

  update = async ({ _id, ...rest }: Gateway) => {
    const { data, status } = await axios.patch(`${API_URL as string}/api/gateway/${_id}`, { ...rest }, config);

    return { data, status };
  };

  remove = async (id: string) => {
    const { data, status } = await axios.delete(`${API_URL as string}/api/gateway/${id}`, config);

    return { data, status };
  };
}

export default new GatewaysService();
