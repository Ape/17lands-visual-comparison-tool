import getWithCache from '../../getWithCache';

export interface GetCardDataFunction {
  (params: CardDataParams): any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface CardDataParams {
  expansion: string;
  format: string;
  colors?: string;
  startDate?: string;
  endDate?: string;
}

export const getCardData: GetCardDataFunction = async ({ expansion, format, colors, startDate, endDate }) => {
  try {
    const response = await getWithCache(`https://www.17lands.com/card_ratings/data`, {
      expansion,
      format,
      colors,
      start_date: startDate,
      end_date: endDate,
    });

    return response;
  } catch (error) {
    return null;
  }
};
