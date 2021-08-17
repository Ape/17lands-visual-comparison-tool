import { api } from '../../index';
import { GetFiltersFunction } from './getFilters';

export const getFiltersProxy: GetFiltersFunction = async () => {
  try {
    const response = await api.get('/api/filters');

    return response.data;
  } catch (error) {
    return null;
  }
};
