import { api } from '../../index';
import { GetCardDataFunction } from './getCardData';

export const getCardDataProxy: GetCardDataFunction = async (params) => {
  try {
    const response = await api.get('/api/cards', { params });

    return response.data;
  } catch (error) {
    return null;
  }
};
