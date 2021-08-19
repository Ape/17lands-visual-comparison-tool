import { api } from '../../index';
import { GetCardDataFunction } from './getCardData';

export const getCardDataProxy: GetCardDataFunction = async (params) => {
  try {
    if (params.colors === '') {
      delete params.colors;
    }
    const response = await api.get('/api/cards', { params });

    return response.data;
  } catch (error) {
    return null;
  }
};
