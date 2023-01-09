/* eslint-disable class-methods-use-this */
import axios from 'axios';

import { Gateway } from './gateway.service';

import { API_URL } from '@/constants';

const config = { headers: { 'Content-Type': 'application/json' } };

export type Peripheral = {
  _id: string;
  uid: number;
  vendor: string;
  status: string;
  createdAt: string;
  gateway: string;
};

class PeripheralsService {
  getAll = async () => {
    const { data, status } = await axios.get(`${API_URL as string}/api/peripherals`, config);

    return { data, status };
  };

  getOne = async (id: string) => {
    const { data, status } = await axios.get(`${API_URL as string}/api/peripheral/${id}`, config);

    return { data, status };
  };

  add = async (body: Peripheral) => {
    const { data, status } = await axios.post(`${API_URL as string}/api/peripheral`, body, config);

    return { data, status };
  };

  update = async ({ _id, ...rest }: Peripheral) => {
    const { data, status } = await axios.patch(`${API_URL as string}/api/peripheral/${_id}`, { ...rest }, config);

    return { data, status };
  };

  remove = async (id: string) => {
    const { data, status } = await axios.delete(`${API_URL as string}/api/peripheral/${id}`, config);

    return { data, status };
  };
}

export default new PeripheralsService();
