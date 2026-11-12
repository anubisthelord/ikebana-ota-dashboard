
import { api } from '../../../lib/axios';

import type {
  MyVendorsResponse,
} from '../types/vendor.types';

export const vendorService = {
  async getMyVendors(): Promise<MyVendorsResponse> {
    const response = await api.get<MyVendorsResponse>('/vendors/my');

    return response.data;
  },
};
