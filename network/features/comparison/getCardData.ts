import { api } from '../../index';

interface GetCardDataFunction {
  (params: CardDataParams): any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CardDataParams {
  expansion: string;
  format: string;
  startDate: string;
  endDate: string;
}

// ?expansion=AFR&format=PremierDraft&start_date=2021-03-25&end_date=${new Date().toISOString().slice(0, 10)}

const getCardData: GetCardDataFunction = async ({ expansion, format, startDate, endDate }) => {
  try {
    const response = await api.get(`https://www.17lands.com/card_ratings/data`, {
      params: {
        expansion,
        format,
        start_date: startDate,
        end_date: endDate,
      },
    });

    return response;
  } catch (error) {
    return null;
  }
};

export default getCardData;
